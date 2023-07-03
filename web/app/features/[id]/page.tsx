// import { revalidatePath } from 'next/cache'
// import { TestCase } from '@/generated-api'
// import React from 'react'
// import { SortableTree } from '@/Tree/SortableTree'
// import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
// import CreateTestCase from '@/components-client/CreateTestCase'
// import { TestResultsApi } from '@/generated-api/apis/TestResultsApi'
// import UpdateFeature from '@/components-server/UpdateFeature'

// const testResultClient = new TestResultsApi()

// const testCasesClient = new TestCasesApi()
// async function getTestResults(id: RequestInit | undefined) {
//   const testResults = await testResultClient.testResultsGet(id)
//   return testResults
// }

// export default async function page({ params }: { params: { id: string } }) {
//   const featureUrl = `http://localhost:5001/features/${params.id}`
//   const testCasesUrl = `http://localhost:5001/testCases/feature/${params.id}`
//   const testResultsUrl = `http://localhost:5001/testResults/${params.id}`
//   const featureRes = await fetch(featureUrl, { cache: 'no-store' })
//   const feature = await featureRes.json()
//   const testCasesRes = await fetch(testCasesUrl, { cache: 'no-store' })
//   const testCases: TestCase[] = await testCasesRes.json()
//   const testResultsRes = await fetch(testResultsUrl, { cache: 'no-store' })
//   const testResults = await testResultsRes.json()

//   return (
//     <div>
//       <h2>Feature/id page</h2>
//       <UpdateFeature feature={feature} />
//       <SortableTree
//         collapsible
//         indicator
//         removable
//         testCases={testCases}
//         testResults={testResults}
//       />
//       <CreateTestCase featureId={+params.id} />
//     </div>
//   )
// }

import { revalidatePath } from 'next/cache'
import { Configuration, TestCase, TestResult } from '@/generated-api'
import React from 'react'
import { SortableTree } from '@/Tree/SortableTree'
import { TestCasesApi, FeaturesApi, TestResultsApi } from '@/generated-api/apis'
import CreateTestCase from '@/components-client/CreateTestCase'
import UpdateFeature from '@/components-server/UpdateFeature'
import UpdateFeatureActions from '@/components-client/UpdateFeatureActions'
import UpdateFeatureActions2 from '@/components-client/UpdateFeatureActions2'

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

  // const testResultsResponse = await testResultClient.testResultsIdGet({
  //   id: +params.id,
  // })

  // let testResults: TestResult[] = []

  // if (Array.isArray(testResultsResponse)) {
  //   testResults = testResultsResponse
  // } else if (testResultsResponse && typeof testResultsResponse === 'object') {
  //   console.warn(
  //     'Expected testResults to be an array, but received an object. Wrapping the object in an array.'
  //   )
  //   testResults = [testResultsResponse]
  // } else {
  //   console.error('Unexpected response for test results:', testResultsResponse)
  // }

  return (
    <div>
      <h2>Feature/id page</h2>
      <UpdateFeature feature={feature} />
      <UpdateFeatureActions feature={feature} />
      <UpdateFeatureActions2 id={params.id} />
      <SortableTree
        collapsible
        indicator
        removable
        testCases={testCases}
        testResults={testResults}
        // testResults={[]}
      />
      <CreateTestCase featureId={+params.id} />
    </div>
  )
}
