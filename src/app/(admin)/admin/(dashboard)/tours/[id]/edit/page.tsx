import { prisma } from "@/lib/db"
import { TourAdminForm } from "@/features/tours/components/TourAdminForm"
import { notFound } from "next/navigation"

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  const tour = await prisma.tour.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!tour) {
    notFound()
  }

  // Parse JSON objects to ensure correct types for defaultValues
  const initialData = {
    ...tour,
    pricing: tour.pricing ? (typeof tour.pricing === 'string' ? JSON.parse(tour.pricing) : tour.pricing) : {},
    flights: tour.flights ? (typeof tour.flights === 'string' ? JSON.parse(tour.flights) : tour.flights) : [],
    hotels: tour.hotels ? (typeof tour.hotels === 'string' ? JSON.parse(tour.hotels) : tour.hotels) : []
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Turu Düzenle</h1>
      </div>
      
      <TourAdminForm initialData={initialData} />
    </div>
  )
}
