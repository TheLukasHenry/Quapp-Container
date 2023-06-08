'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TestCase } from '@/generated-api/models/TestCase'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
// import { revalidatePath } from 'next/cache'

interface CreateTestCaseProps {
  featureId: number
}

export default function CreateTestCase({ featureId }: CreateTestCaseProps) {
  const [name, setName] = useState<TestCase['name']>('')
  const testCasesClient = new TestCasesApi()
  const router = useRouter()

  async function getTestCasesByFeatureId(featureId: number) {
    try {
      const response = await testCasesClient.testCasesFeatureFeatureIdGet({
        featureId,
      })
      return response
    } catch (error) {
      console.error('Failed to fetch test cases: ', error)
      return []
    }
  }

  async function createTestCase() {
    const response = await testCasesClient.testCasesPost({
      createTestCaseInput: { name, featureId },
    })

    setName('')
    router.refresh()
    // router.refresh()

    // Call getTestCasesByFeatureId after creating a new testCase
    // await getTestCasesByFeatureId(featureId)
  }

  return (
    <form>
      <h3>Create a new testCase</h3>
      <input
        type="text"
        value={name?.toString()}
        onChange={(e) => setName(e.target.value)}
        placeholder="testCase name"
      />

      <button type="button" onClick={createTestCase}>
        Create testCase
      </button>
    </form>
  )
}
