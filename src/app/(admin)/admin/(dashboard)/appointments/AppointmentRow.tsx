"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Trash2, Eye, X } from "lucide-react"

export function AppointmentRow({ appointment, onUpdateStatus, onDelete }: { appointment: any, onUpdateStatus: (id: string, status: string) => Promise<void>, onDelete: (id: string) => Promise<void> }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const handleUpdate = async () => {
    setIsUpdating(true)
    await onUpdateStatus(appointment.id, appointment.status)
    setIsUpdating(false)
  }

  const handleDelete = async () => {
    if (confirm("Bu randevuyu silmek istediğinize emin misiniz?")) {
      setIsDeleting(true)
      await onDelete(appointment.id)
      setIsDeleting(false)
    }
  }

  const passengers = Array.isArray(appointment.passengers) ? appointment.passengers : []
  const roomTypeLabel = appointment.room_type === "2_kisilik" ? "2 Kişilik Oda" : appointment.room_type === "3_kisilik" ? "3 Kişilik Oda" : appointment.room_type === "4_kisilik" ? "4 Kişilik Oda" : appointment.room_type || "Belirtilmedi"

  return (
    <>
      <tr className="hover:bg-slate-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-slate-500">
          {new Date(appointment.created_at).toLocaleDateString("tr-TR")}
        </td>
        <td className="px-6 py-4 font-medium text-slate-900">
          {appointment.full_name}
        </td>
        <td className="px-6 py-4 text-slate-600">
          {appointment.phone}<br />
          <span className="text-xs text-slate-400">{appointment.email}</span>
        </td>
        <td className="px-6 py-4 text-slate-600">
          {appointment.tour?.title || "Bilinmiyor"}<br />
          <span className="text-xs font-semibold">{appointment.pax} Kişi</span>
        </td>
        <td className="px-6 py-4">
          {appointment.status === "pending" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              <Clock className="h-3 w-3" />
              Bekliyor
            </span>
          ) : appointment.status === "pending_payment" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Clock className="h-3 w-3" />
              Ödeme Bekliyor
            </span>
          ) : appointment.status === "paid" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-3 w-3" />
              Ödendi
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
              <CheckCircle2 className="h-3 w-3" />
              İletişime Geçildi
            </span>
          )}
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex justify-center gap-2">
            <Button onClick={() => setIsModalOpen(true)} variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <Eye className="h-4 w-4" />
            </Button>
            <Button onClick={handleUpdate} disabled={isUpdating} variant="outline" size="sm">
              {appointment.status === "pending" || appointment.status === "pending_payment" ? "İletişime Geçildi İşaretle" : "Bekliyor'a Al"}
            </Button>
            <Button onClick={handleDelete} disabled={isDeleting} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </td>
      </tr>

      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-slate-800">Kayıt Detayları</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-bold text-sm text-slate-500 mb-2 uppercase">İletişim Bilgileri</h3>
                  <p><strong>Ad Soyad:</strong> {appointment.full_name}</p>
                  <p><strong>Telefon:</strong> {appointment.phone}</p>
                  <p><strong>E-posta:</strong> {appointment.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-bold text-sm text-slate-500 mb-2 uppercase">Tur & Oda Seçimi</h3>
                  <p><strong>Tur:</strong> {appointment.tour?.title}</p>
                  <p><strong>Oda:</strong> {appointment.room_count} x {roomTypeLabel}</p>
                  <p><strong>Toplam Kişi:</strong> {appointment.pax}</p>
                  <p><strong>Fiyat:</strong> {appointment.total_price ? appointment.total_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "Bilinmiyor"}</p>
                </div>
              </div>

              {passengers.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm text-slate-500 mb-3 uppercase">Yolcu Listesi</h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-600 font-medium">
                        <tr>
                          <th className="px-4 py-3">Ad Soyad</th>
                          <th className="px-4 py-3">TC Kimlik No</th>
                          <th className="px-4 py-3">Doğum Tarihi</th>
                          <th className="px-4 py-3">Telefon</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {passengers.map((p: any, idx: number) => (
                          <tr key={idx} className="bg-white">
                            <td className="px-4 py-3 font-medium">{p.firstName} {p.lastName}</td>
                            <td className="px-4 py-3">{p.tc || "-"}</td>
                            <td className="px-4 py-3">{p.dob || "-"}</td>
                            <td className="px-4 py-3">{p.phone || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
              <Button onClick={() => setIsModalOpen(false)}>Kapat</Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
