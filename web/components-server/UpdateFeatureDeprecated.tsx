'use client'

import { useRouter } from 'next/navigation'
import { Feature } from '@/generated-api/models/Feature'
import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'
import React from 'react'

type UpdateFeatureProps = {
  feature: Feature
}

export default function UpdateFeature({ feature }: UpdateFeatureProps) {
  const { id, name, companyId } = feature || {}
  const featuresClient = new FeaturesApi()

  const router = useRouter()

  async function putFeature(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const body: Feature = {
      name: formData.get('name') as string,
      companyId: Number(formData.get('companyId')),
      id,
    }
    const response = await featuresClient.featuresPut({ feature: body })
    console.log('Feature updated:', response)
    router.refresh()
  }

  return (
    <div>
      Update feature component
      <form onSubmit={putFeature}>
        <div>feature name: {name}</div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={name ?? ''} />
        <label htmlFor="companyId">companyId</label>
        <input type="text" name="companyId" defaultValue={companyId ?? ''} />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}
