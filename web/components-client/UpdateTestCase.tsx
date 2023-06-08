'use client'

import { useRouter } from 'next/navigation'
import { TestCase } from '@/generated-api/models/TestCase'
import {
  TestCasesApi,
  TestCasesPutRequest,
} from '@/generated-api/apis/TestCasesApi'
import React from 'react'
import { UpdateTestCaseInput } from '@/generated-api/models/UpdateTestCaseInput'

// type UpdateTestCaseProps = {
//   testCase: TestCase
// }

export default function UpdateTestCase({ testCase }: { testCase: TestCase }) {
  const { id, name, featureId, sortOrder, offset } = testCase || {}
  const testCasesClient = new TestCasesApi()
  const router = useRouter()

  async function putTestCase(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const updateTestCaseInput: UpdateTestCaseInput = {
      id: id,
      name: formData.get('name') as string,
      featureId: Number(formData.get('featureId')),
      sortOrder: Number(formData.get('sortOrder')),
      offset: Number(formData.get('offset')),
    }

    const input: TestCasesPutRequest = {
      updateTestCaseInput: updateTestCaseInput,
    }

    const response = await testCasesClient.testCasesPut(input)
    console.log('TestCase updated:', response)
    router.refresh()
  }

  return (
    <div>
      Single TestCase page
      <form onSubmit={putTestCase}>
        <div>testCase name: {name}</div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={name ?? ''} />

        <label htmlFor="featureId">featureId</label>
        <input type="text" name="featureId" defaultValue={featureId ?? ''} />

        <label htmlFor="featureId">sortOrder</label>
        <input type="text" name="sortOrder" defaultValue={sortOrder ?? ''} />

        <label htmlFor="offset">offset</label>
        <input type="text" name="offset" defaultValue={offset ?? ''} />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}
