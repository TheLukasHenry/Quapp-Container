'use client'
import React, { CSSProperties } from 'react'
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { TreeItem, Props as TreeItemProps } from './TreeItem'
import { iOS } from '../../utilities'

interface Props extends TreeItemProps {
  id: number
  name: string
}

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true)

export function SortableTreeItem({
  id,
  name,
  depth,
  singleResults,
  testResults,
  resultsLength,
  ...props
}: Props) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  })
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <TreeItem
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      name={name}
      id={+id}
      singleResults={singleResults}
      testResults={testResults}
      resultsLength={resultsLength}
      ghost={isDragging}
      disableSelection={iOS}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  )
}
