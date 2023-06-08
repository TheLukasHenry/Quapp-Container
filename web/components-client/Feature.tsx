'use client'
import { Feature } from '@/generated-api'
import Link from 'next/link'
import { FeaturesApi } from '../generated-api/apis/FeaturesApi'
import { useRouter } from 'next/navigation'

const featuresClient = new FeaturesApi()

interface FeatureComponentProps {
  feature: Feature
}

async function deleteFeatureById(id: number) {
  console.log('Feature deleted:', id)
  return await featuresClient.featuresIdDelete({ id: id })
}

export default function FeatureComponent({ feature }: FeatureComponentProps) {
  const { id, name } = feature || {}
  const router = useRouter()
  return (
    <>
      <Link href={`/features/${id || ''}`}>
        <div>
          <div>{name}</div>
        </div>
      </Link>
      <button
        onClick={async () => {
          await deleteFeatureById(id!)
          router.refresh()
        }}
      >
        Delete
      </button>
    </>
  )
}
