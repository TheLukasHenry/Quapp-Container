'use client'
import React, { forwardRef, HTMLAttributes, useState } from 'react'
import classNames from 'classnames'

import { Action } from './Action'
import { Handle } from './Handle'
import { Remove } from './Remove'
import styles from './TreeItem.module.css'
import { TestCase } from '@/generated-api/models/TestCase'
import { UpdateTestCaseInput } from '@/generated-api/models/UpdateTestCaseInput'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
import { TestResult } from '../../types'
import { TestResultsApi } from '@/generated-api/apis/TestResultsApi'
import { CreateTestResultInput } from '@/generated-api/models/CreateTestResultInput'
import { UpdateTestResultInput } from '@/generated-api/models/UpdateTestResultInput'
import { UpdateSingleTestResultInput } from '@/generated-api/models/UpdateSingleTestResultInput'
import { Feature } from '@/generated-api/models/Feature'

const testCasesClient = new TestCasesApi()
const testResultClient = new TestResultsApi()

async function createTestResult(input: CreateTestResultInput) {
  const response = await testResultClient.testResultsPost({
    createTestResultInput: input,
  })
}

async function updateTestResult(input: UpdateSingleTestResultInput) {
  const response = await testResultClient.testResultsUpdateSingleTestResultPut({
    updateSingleTestResultInput: input,
  })
  console.log('TestResult updated:', response)
  console.log('input in updatedTestResult: ', input)
}

async function updateTestCase(updateTestCaseInput: UpdateTestCaseInput) {
  const response = await testCasesClient.testCasesPut({ updateTestCaseInput })
  console.log('TestCase updated:', response)
}

async function deleteTestCase(id: number) {
  console.log('TestCase deleted:', id)
  return await testCasesClient.testCasesIdDelete({ id: id })
}

export interface Props extends HTMLAttributes<HTMLLIElement> {
  childCount?: number
  clone?: boolean
  collapsed?: boolean
  depth: number
  name: string
  disableInteraction?: boolean
  disableSelection?: boolean
  ghost?: boolean
  handleProps?: any
  indicator?: boolean
  indentationWidth: number
  id: number
  testResults?: TestResult[]
  singleResults?: string[]
  resultsLength: number
  onCollapse?(): void
  onRemove?(id: number): void
  wrapperRef?(node: HTMLLIElement): void
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      name: initialName,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      wrapperRef,
      id,
      singleResults,
      testResults,
      resultsLength,
      ...props
    },
    ref
  ) => {
    const [name, setName] = useState(initialName)
    const [showModal, setShowModal] = useState(false)
    const [currentComment, setCurrentComment] = useState('')
    const [currentResult, setCurrentResult] = useState('')
    const [currentTestResult, setCurrentTestResult] =
      useState<TestResult | null>(null)

    const handleOpenModal = (testResult: TestResult) => {
      setCurrentTestResult(testResult)
      setCurrentComment(testResult.comment || '')
      setCurrentResult(testResult.singleResult || '')
      setShowModal(true)
    }

    // updateTestResult({
    //   testResultId: currentTestResult?.testResultId,
    //   singleResultJson: JSON.stringify({
    //     testCaseId: currentTestResult?.testCaseId,
    //     comment: currentComment,
    //     singleResult: currentResult,
    //   }),
    //   // setShowModal(false)
    // })

    // console.log('🚀 ~ file: TreeItem.tsx:70 ~ single testCase testResults:', testResults)

    // console.log('singleResults in TreeItem.tsx: ', singleResults)
    // console.trace(`TreeItem.tsx:71: ${singleResults}`)
    const handleDelete = async () => {
      console.log("handleDelete on remove working") // Notify parent to remove item from state
      onRemove && onRemove(id)
      await deleteTestCase(id)
    }

    return (
      <li
        className={classNames(
          styles.Wrapper,
          clone && styles.clone,
          ghost && styles.ghost,
          indicator && styles.indicator,
          disableSelection && styles.disableSelection,
          disableInteraction && styles.disableInteraction
        )}
        ref={wrapperRef}
        style={
          {
            '--spacing': `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={styles.TreeItem} ref={ref} style={style}>
          <Handle {...handleProps} />
          {onCollapse && (
            <Action
              onClick={onCollapse}
              className={classNames(
                styles.Collapse,
                collapsed && styles.collapsed
              )}
            >
              {collapseIcon}
            </Action>
          )}
          <input
            className={styles.Text}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() =>
              updateTestCase({
                id: id,
                name,
              })
            }
          />
          {clone && childCount && childCount > 1 ? (
            <span className={styles.Count}>{childCount}</span>
          ) : null}
          {showModal && (
            <div className="modal">
              <textarea
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
              />
              <select
                value={currentResult}
                onChange={(e) => setCurrentResult(e.target.value)}
              >
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
              </select>
              <button
                onClick={() => {
                  updateTestResult({
                    testResultId: currentTestResult?.testResultId,
                    singleResultJson: JSON.stringify({
                      testCaseId: currentTestResult?.testCaseId,
                      comment: currentComment,
                      singleResult: currentResult,
                    }),
                  })
                  setShowModal(false)
                }}
              >
                Save
              </button>
              <button onClick={() => setShowModal(false)}>X</button>
            </div>
          )}
          {testResults
            ? testResults.map((testResult, index) => (
                <button onClick={() => handleOpenModal(testResult)} key={index}>
                  {testResult.singleResult
                    ? testResult.singleResult === 'pass'
                      ? '✅'
                      : '❌'
                    : '+'}
                </button>
              ))
            : null}

          {!clone && <Remove onClick={handleDelete} />}
        </div>
      </li>
    )
  }
)

TreeItem.displayName = 'TreeItem'

// ... Rest of the code

const collapseIcon = (
  <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 41">
    <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" />
  </svg>
)
