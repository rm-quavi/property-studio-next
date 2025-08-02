import TheHeader from '@/components/TheHeader'
import EditPropertyForm from './EditPropertyForm'

interface EditPropertyPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const resolvedParams = await params
  const propertyId = parseInt(resolvedParams.id)

  return (
    <div>
      <TheHeader />
      <EditPropertyForm propertyId={propertyId} />
    </div>
  )
} 