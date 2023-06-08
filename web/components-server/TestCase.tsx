'use client'
import { TestCase } from '@/generated-api'
import Link from 'next/link'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
import { useRouter } from 'next/navigation'

const testCasesClient = new TestCasesApi()

interface TestCaseComponentProps {
  testCase: TestCase
}

async function deleteTestCaseById(id: number) {
  console.log('TestCase deleted:', id)
  return await testCasesClient.testCasesIdDelete({ id: id })
}

export default function TestCaseComponent({
  testCase,
}: TestCaseComponentProps) {
  const { id, name } = testCase || {}
  const router = useRouter()
  return (
    <>
      <Link href={`/testCases/${id || ''}`}>
        <div>
          <div>{name}</div>
        </div>
      </Link>
      <button
        onClick={async () => {
          await deleteTestCaseById(id!)
          router.refresh()
        }}
      >
        Delete
      </button>
    </>
  )
}
