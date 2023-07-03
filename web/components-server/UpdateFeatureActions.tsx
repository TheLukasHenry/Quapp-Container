import { Feature } from '@/generated-api/models/Feature'
import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'
import { revalidatePath } from 'next/cache'

const featuresClient = new FeaturesApi()

export default async function UpdateFeatureActions({ id }: { id: string }) {
  const feature = await featuresClient.featuresIdGet({ id: +id })

  const { name, companyId } = feature || {}

  async function putFeature(formData: FormData) {
    'use server'

    const body: Feature = {
      name: formData.get('name') as string,
      companyId: Number(formData.get('companyId')),
      id: +id,
    }

    await featuresClient.featuresPut({ feature: body })
    revalidatePath(`/feature/${id}`)
  }

  return (
    <div>
      <h2>Update Feature</h2>
      <form action={putFeature}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={name ?? ''} />
        <label htmlFor="companyId">companyId</label>
        <input type="text" name="companyId" defaultValue={companyId ?? ''} />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}
