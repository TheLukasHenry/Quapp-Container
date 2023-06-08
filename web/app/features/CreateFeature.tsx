'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Feature } from '@/generated-api/models/Feature'
import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'

export default function CreateFeature({ count = 1 }) {
  const [companyId, setCompanyId] = useState<Feature['companyId'] | undefined>(
    0
  )

  const [name, setName] = useState<Feature['name']>('')

  const featuresClient = new FeaturesApi()

  const router = useRouter()

  async function createFeature() {
    const response = await featuresClient.featuresPost({
      createFeatureInput: { name, companyId: companyId ?? 0 },
    })

    setName('')
    setCompanyId(0)
    router.refresh()
  }

  return (
    <form>
      <h3>Create a new Feature</h3>
      <p>count: {count}</p>
      <input
        type="text"
        value={name ?? ''}
        onChange={(e) => setName(e.target.value)}
        placeholder="Feature name"
      />
      <input
        type="number"
        value={companyId !== undefined ? companyId : ''}
        onChange={(e) => setCompanyId(+e.target.value || 1)}
        placeholder="Company id"
      />

      <button type="button" onClick={createFeature}>
        Create Feature
      </button>
    </form>
  )
}
