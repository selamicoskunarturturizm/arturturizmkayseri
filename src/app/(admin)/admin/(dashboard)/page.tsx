import { prisma } from "@/lib/db"
import { Plane, CalendarCheck, Users } from "lucide-react"

export default async function AdminDashboardPage() {
  const totalTours = await prisma.tour.count()
  const activeTours = await prisma.tour.count({ where: { is_active: true } })
  const pendingAppointments = await prisma.appointment.count({ where: { status: "pending" } })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Genel Bakış</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Plane className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Toplam Tur</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalTours} <span className="text-sm font-normal text-slate-500">({activeTours} Aktif)</span></h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Bekleyen Randevu</p>
            <h3 className="text-2xl font-bold text-slate-900">{pendingAppointments}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Toplam Ziyaretçi</p>
            <h3 className="text-2xl font-bold text-slate-900">--</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
