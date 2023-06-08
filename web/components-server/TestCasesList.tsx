import { TestCase } from '@/generated-api/models/TestCase'
import TestCaseComponent from './TestCase'

type TestCaseListProps = {
  testCases: TestCase[]
}

export default function TestCaseList({ testCases }: TestCaseListProps) {
  return (
    <div>
      {testCases.map((testCase) => {
        return (
          <div key={testCase.id}>
            <TestCaseComponent testCase={testCase} />
          </div>
        )
      })}
    </div>
  )
}
