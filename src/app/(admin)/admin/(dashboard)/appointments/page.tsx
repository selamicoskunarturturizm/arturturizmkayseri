import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { AppointmentRow } from "./AppointmentRow"

async function updateAppointmentStatus(id: string, currentStatus: string) {
  "use server"
  const newStatus = (currentStatus === "pending" || currentStatus === "pending_payment") ? "contacted" : "pending"
  await prisma.appointment.update({
    where: { id },
    data: { status: newStatus }
  })
  revalidatePath("/admin/appointments")
}

async function deleteAppointment(id: string) {
  "use server"
  // Önce silinen randevunun kişi sayısını ve turunu bul
  const appt = await prisma.appointment.findUnique({
    where: { id },
    select: { pax: true, tour_id: true },
  })
  // Randevuyu sil
  await prisma.appointment.delete({ where: { id } })
  // Kapasiteyi geri artır
  if (appt && appt.pax > 0) {
    await prisma.tour.update({
      where: { id: appt.tour_id },
      data: { capacity: { increment: appt.pax } },
    })
  }
  revalidatePath("/admin/appointments")
}

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { created_at: "desc" },
    include: { tour: true }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Randevular</h1>
      
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Tarih</th>
                <th className="px-6 py-4">Müşteri</th>
                <th className="px-6 py-4">İletişim</th>
                <th className="px-6 py-4">Tur & Kişi</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Henüz randevu bulunmuyor.
                  </td>
                </tr>
              ) : appointments.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  onUpdateStatus={updateAppointmentStatus}
                  onDelete={deleteAppointment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
