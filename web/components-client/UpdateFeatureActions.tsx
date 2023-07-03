// NAMING NEEDS TO BE CHANGED

// 'use client'

import { Feature } from '@/generated-api/models/Feature'
import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'

import { revalidatePath } from 'next/cache'

type UpdateFeatureActionsProps = {
  feature: Feature
  // putFeature: (formData: FormData) => Promise<void>
}

export default async function UpdateFeatureActions({
  feature,
}: // putFeature,
UpdateFeatureActionsProps) {
  const { id, name, companyId } = feature || {}

  const featuresClient = new FeaturesApi()

  // const formData = new FormData(e.currentTarget)

  // async function putFeature() {
  //   'use server'

  //   const body: Feature = {
  //     name: formData.get('name') as string,
  //     companyId: Number(formData.get('companyId')),
  //     id,
  //   }
  //   console.log('body: ', body)
  //   await featuresClient.featuresPut({ feature: body })

  //   revalidatePath(`/feature/${feature.id}`)
  // }

  async function putFeature(formData: FormData) {
    'use server'

    const body: Feature = {
      name: formData.get('name') as string,
      companyId: Number(formData.get('companyId')),
      id,
    }
    console.log('body: ', body)
    // await featuresClient.featuresPut({ feature: body })
    await featuresClient.featuresPut({
      feature: body,
      // feature: { name, id, companyId },
    })

    revalidatePath(`/feature/${feature.id}`)
  }

  return (
    <div>
      <h2>Update feature Actions edit</h2>
      <form action={putFeature}>
        {/* <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={name ?? ''} />
        <label htmlFor="companyId">companyId</label>
        <input type="text" name="companyId" defaultValue={companyId ?? ''} />

        <button type="submit">Save</button> */}
        <label>Name</label>
        <input name="name" type="text" defaultValue={name ?? ''} />{' '}
        <label>companyId</label>
        <input name="companyId" type="text" defaultValue={companyId ?? ''} /> 
        <button type="submit">Save and Continue</button>
      </form>
    </div>
  )
}
