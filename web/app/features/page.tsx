import { FeaturesApi } from '../../generated-api/apis/FeaturesApi'
import CreateFeature from './CreateFeature'
import FeatureList from '../../components-server/FeaturesList'

const featuresClient = new FeaturesApi()

async function getFeatures() {
  const response = await featuresClient.featuresGet({
    ...{ cache: 'no-store' },
  })
  return response
}

export default async function Features() {
  const features = await getFeatures()
  console.log('features: ', features)

  return (
    <div>
      <FeatureList features={features} />
      <CreateFeature count={features.length} />
    </div>
  )
}
