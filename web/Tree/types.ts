import type { MutableRefObject } from 'react'

export interface TreeItem {
  id: number
  name: string
  testResults: TestResult[]
  resultsLength: number
  children: TreeItem[]
  collapsed?: boolean
}

export type TreeItems = TreeItem[]

export interface FlattenedItem extends TreeItem {
  parentId: null | string
  depth: number
  index: number
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[]
  offset: number
}>

export interface TestResult {
  singleResult?: string
  comment?: string
  testCaseId?: number
  testResultId: number
}
