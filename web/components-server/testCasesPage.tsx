import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
import CreateTestCase from './CreateTestCase'
import TestCasesList from './TestCasesList'

const testCasesClient = new TestCasesApi()

async function getTestCases() {
  const response = await testCasesClient.testCasesGet({
    ...{ cache: 'no-store' },
  })
  return response
}

export default async function TestCases() {
  const testCases = await getTestCases()

  return (
    <div className="pt-32">
      TestCases Page
      <TestCasesList testCases={testCases} />
      <CreateTestCase count={testCases.length} />
    </div>
  )
}
