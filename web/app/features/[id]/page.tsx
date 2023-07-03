import { TestCase } from '@/generated-api'
import React from 'react'
import { SortableTree } from '@/Tree/SortableTree'
import { TestCasesApi, FeaturesApi, TestResultsApi } from '@/generated-api/apis'
import CreateTestCase from '@/components-client/CreateTestCase'
import UpdateFeatureActions from '@/components-client/UpdateFeatureActions'

const featuresClient = new FeaturesApi()
const testResultClient = new TestResultsApi()
const testCasesClient = new TestCasesApi()

export default async function page({ params }: { params: { id: string } }) {
  const feature = await featuresClient.featuresIdGet({ id: +params.id })
  const testCases: TestCase[] =
    await testCasesClient.testCasesFeatureFeatureIdGet({
      featureId: +params.id,
    })
  const testResults =
    (await testResultClient.testResultsIdGet({
      id: +params.id,
    })) || []

  return (
    <div>
      <h2>Feature/id page</h2>
      <UpdateFeatureActions id={params.id} />
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
