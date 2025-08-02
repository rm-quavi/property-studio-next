import TheHeader from '@/components/TheHeader'
import PropertyDetailContent from './PropertyDetailContent'

interface PropertyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const resolvedParams = await params
  const propertyId = parseInt(resolvedParams.id)

  return (
    <div>
      <TheHeader />
      <PropertyDetailContent propertyId={propertyId} />
    </div>
  )
} 