import { revalidatePath } from 'next/cache'
import { TestCase } from '@/generated-api'
import React from 'react'
import { SortableTree } from '@/Tree/SortableTree'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
import CreateTestCase from '@/components-client/CreateTestCase'
import { TestResultsApi } from '@/generated-api/apis/TestResultsApi'
import UpdateFeature from '@/components-server/UpdateFeature'

const testResultClient = new TestResultsApi()

const testCasesClient = new TestCasesApi()
async function getTestResults(id: RequestInit | undefined) {
  const testResults = await testResultClient.testResultsGet(id)
  return testResults
}

export default async function page({ params }: { params: { id: string } }) {
  const featureUrl = `http://localhost:5000/features/${params.id}`
  const testCasesUrl = `http://localhost:5000/testCases/feature/${params.id}`
  const testResultsUrl = `http://localhost:5000/testResults/${params.id}`
  const featureRes = await fetch(featureUrl, { cache: 'no-store' })
  const feature = await featureRes.json()
  const testCasesRes = await fetch(testCasesUrl, { cache: 'no-store' })
  const testCases: TestCase[] = await testCasesRes.json()
  const testResultsRes = await fetch(testResultsUrl, { cache: 'no-store' })
  const testResults = await testResultsRes.json()
  // console.log('testResults: ', testResults)

  return (
    <div>
      <h2>Actions feature edit</h2>
      <UpdateFeature feature={feature} />
      <SortableTree
        collapsible
        indicator
        removable
        testCases={testCases}
        testResults={testResults}
      />
      <CreateTestCase featureId={+params.id} />
    </div>
  )
}
