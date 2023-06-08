'use client'

import { Feature } from '@/generated-api/models/Feature'
import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'

import { revalidatePath } from 'next/cache'

type UpdateFeatureActionsProps = {
  feature: Feature
  putFeature: (formData: FormData) => Promise<void>
}

export default function UpdateFeatureActions({
  feature,
  putFeature,
}: UpdateFeatureActionsProps) {
  const { id, name, companyId } = feature || {}

  const featuresClient = new FeaturesApi()

  const formData = new FormData(e.currentTarget)

  async function putFeature() {
    'use server'

    const body: Feature = {
      featureName: formData.get('featureName') as string,
      companyID: Number(formData.get('companyID')),
      featureID,
    }
    console.log('body: ', body)
    await featuresClient.featuresPut({ feature: body })

    revalidatePath(`/feature/${feature.featureID}`)
  }

  // async function putFeature(formData: FormData) {
  //   'use server'

  //   const body: Feature = {
  //     featureName: formData.get('featureName') as string,
  //     companyID: Number(formData.get('companyID')),
  //     featureID,
  //   }
  //   console.log('body: ', body)
  //   // await featuresClient.featuresPut({ feature: body })
  //   await featuresClient.featuresPut({
  //     feature: { featureName, featureID, companyID },
  //   })

  //   revalidatePath(`/feature/${feature.featureID}`)
  // }

  return (
    <div>
      <h2>Actions edit</h2>
      <form action={putFeature}>
        <label htmlFor="featureName">Name</label>
        <input type="text" name="featureName" defaultValue={name ?? ''} />
        <label htmlFor="companyID">companyID</label>
        <input type="text" name="companyID" defaultValue={companyId ?? ''} />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}
