'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Announcements,
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  DropAnimation,
  defaultDropAnimation,
  Modifier,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import {
  buildTree,
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty,
} from './utilities'
import type {
  FlattenedItem,
  SensorContext,
  TestResult,
  TreeItems,
} from './types'
import { sortableTreeKeyboardCoordinates } from './keyboardCoordinates'
import { SortableTreeItem } from './components'
import { TestCase } from '@/generated-api/models/TestCase'
import { UpdateTestCaseInput } from '@/generated-api/models/UpdateTestCaseInput'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
import { TestResultsApi } from '@/generated-api/apis/TestResultsApi'
import { useRouter } from 'next/navigation'
import { CreateTestResultInput } from '@/generated-api/models/CreateTestResultInput'

const testCasesClient = new TestCasesApi()
const testResultClient = new TestResultsApi()

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
}

const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
}
function convertToTreeItems(
  testCases: TestCase[],
  testResults: TestResult[]
): TreeItems {
  const treeItems: TreeItems = []
  const sortedTestCases = testCases.sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  )

  const map = new Map()
  const resultsMap = new Map()

  // Helper function to remove duplicates based on testResultId
  const removeDuplicates = (results: TestResult[]): TestResult[] => {
    const uniqueResults = Array.from(
      new Set(results.map((result) => result.testResultId))
    ).map((testResultId) => {
      return results.find((result) => result.testResultId === testResultId)
    })

    // Create a set of all testResultId values
    const allTestResultIds = new Set(
      testResults.map((result) => result.testResultId)
    )

    // Add an object with the missing testResultId to uniqueResults if it's not already present
    for (const testResultId of allTestResultIds) {
      if (
        !uniqueResults.some((result) => result.testResultId === testResultId)
      ) {
        uniqueResults.push({ testResultId: testResultId })
      }
    }

    console.log('uniqueResults: ', uniqueResults)
    return uniqueResults as TestResult[]
  }

  // Parse resultsJson and group test results by testCaseId
  for (const testResult of testResults) {
    const parsedResults = JSON.parse(
      testResult.resultsJson.replace('-- resultsJson\n', '')
    )
    for (const result of parsedResults) {
      const testCaseId = result.testCaseId
      if (!resultsMap.has(testCaseId)) {
        resultsMap.set(testCaseId, [])
      }
      // Add testResultId to the result object
      result.testResultId = testResult.testResultId
      resultsMap.get(testCaseId).push(result)
    }
  }

  for (const testCase of sortedTestCases) {
    const uniqueIdentifier = testCase.id!
    let id: string
    if (typeof uniqueIdentifier === 'number') {
      id = uniqueIdentifier.toString()
    } else {
      id = uniqueIdentifier
    }

    const name = testCase.name || ''
    let testResultsForTestCase = resultsMap.get(uniqueIdentifier) || []

    // Remove duplicates from testResultsForTestCase
    testResultsForTestCase = removeDuplicates(testResultsForTestCase)

    const treeItem = {
      id: id,
      name: name,
      children: [],
      depth: 0,
      testResults: testResultsForTestCase,
    }

    if (testCase.parentId === 0) {
      treeItems.push(treeItem)
    } else {
      const parentTreeItem = map.get(testCase.parentId)
      if (parentTreeItem) {
        parentTreeItem.children.push(treeItem)
        treeItem.depth = parentTreeItem.depth + 1
      }
    }

    map.set(testCase.id!, { ...treeItem })
  }
  console.log('treeItems in convert function: ', treeItems)
  return treeItems
}

interface Props {
  testCases: TestCase[]
  testResults: TestResult[]
  collapsible?: boolean
  indentationWidth?: number
  indicator?: boolean
  removable?: boolean
}

export function SortableTree({
  testCases,
  testResults,
  collapsible,
  indicator,
  indentationWidth = 20,
  removable,
}: Props) {
  const [items, setItems] = useState(() =>
    convertToTreeItems(testCases, testResults)
  )

  const [activeId, setActiveId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: string | null
    overId: string
  } | null>(null)

  const [resultLength, setResultLength] = useState<number>(testResults.length)
  console.log('resultLength: ', resultLength)
  console.log('testResults: ', testResults)

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items)
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    )

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    )
  }, [activeId, items])
  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  })
  const sensors = useSensors(
    useSensor(PointerSensor)
    // useSensor(KeyboardSensor, {
    //   coordinateGetter,
    // })
  )

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  )
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    }
  }, [flattenedItems, offsetLeft])

  const announcements: Announcements = {
    onDragStart(id) {
      return `Picked up ${id}.`
    },
    onDragMove(id, overId) {
      return getMovementAnnouncement('˚onDragMove', id, overId)
    },
    onDragOver(id, overId) {
      return getMovementAnnouncement('onDragOver', id, overId)
    },
    onDragEnd(id, overId) {
      return getMovementAnnouncement('onDragEnd', id, overId)
    },
    onDragCancel(id) {
      return `Moving was cancelled. ${id} was dropped in its original position.`
    },
  }

  console.log('flattenedItems: ', flattenedItems)

  console.log('items: ', items)

  return (
    <DndContext
      announcements={announcements}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <button>create test results column</button>
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(
          ({ id, name, children, collapsed, depth, testResults }) => (
            <SortableTreeItem
              key={id}
              id={id}
              name={name}
              depth={id === activeId && projected ? projected.depth : depth}
              indentationWidth={indentationWidth}
              indicator={indicator}
              collapsed={Boolean(collapsed && children.length)}
              onCollapse={
                collapsible && children.length
                  ? () => handleCollapse(id)
                  : undefined
              }
              onRemove={removable ? () => handleRemove(id) : undefined}
              // singleResults={testResults?.map(
              //   (testResult: TestResult) => testResult.singleResult
              // )}
              testResults={testResults}
              resultsLength={resultLength}
            />
          )
        )}

        {createPortal(
          <DragOverlay
            dropAnimation={dropAnimation}
            modifiers={indicator ? [adjustTranslate] : undefined}
          >
            {activeId && activeItem ? (
              <SortableTreeItem
                id={activeId}
                depth={activeItem.depth}
                clone
                childCount={getChildCount(items, activeId) + 1}
                value={activeId}
                indentationWidth={indentationWidth}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  )

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(String(activeId))

    setOverId(String(activeId))

    const activeItem = flattenedItems.find(({ id }) => id === activeId)

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: String(activeId),
      })
    }

    document.body.style.setProperty('cursor', 'grabbing')
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x)
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(String(over?.id) ?? null)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState()

    if (projected && over) {
      const { depth, parentId } = projected
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      )
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id)
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id)
      const activeTreeItem = clonedItems[activeIndex]

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId }

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)
      const newItems = buildTree(sortedItems)

      setItems(newItems)

      // trigger save action
      saveToDatabase(newItems)
    }
  }

  async function saveToDatabase(newItems: any) {
    try {
      const flattenedItems = flattenTree(newItems)
      const updateTestCaseInputs = flattenedItems.map(
        (item: FlattenedItem, index: number) => {
          return {
            id: Number(item.id),
            sortOrder: index,
            parentId: item.parentId ? Number(item.parentId) : null,
          } as UpdateTestCaseInput
        }
      )

      for (let input of updateTestCaseInputs) {
        await testCasesClient.testCasesPut({ updateTestCaseInput: input })
      }
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation: ' + error.message
      )
    }
  }

  function handleDragCancel() {
    resetState()
  }

  function resetState() {
    setOverId(null)
    setActiveId(null)
    setOffsetLeft(0)
    setCurrentPosition(null)

    document.body.style.setProperty('cursor', '')
  }

  function handleRemove(id: string) {
    setItems((items) => removeItem(items, id))
  }

  function handleCollapse(id: string) {
    setItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        return !value
      })
    )
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: string,
    overId?: string
  ) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          })
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      )
      const overIndex = clonedItems.findIndex(({ id }) => id === overId)
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId)
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)

      const previousItem = sortedItems[overIndex - 1]

      let announcement
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved'
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested'

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1]
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: string | null = previousSibling.parentId
            previousSibling = sortedItems.find(({ id }) => id === parentId)
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`
          }
        }
      }

      return announcement
    }

    return
  }
}

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25,
  }
}
