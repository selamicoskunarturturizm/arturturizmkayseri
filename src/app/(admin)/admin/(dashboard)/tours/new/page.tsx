import { TourAdminForm } from "@/features/tours/components/TourAdminForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewTourPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/tours" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Yeni Tur Ekle</h1>
      </div>
      
      <TourAdminForm />
    </div>
  )
}
