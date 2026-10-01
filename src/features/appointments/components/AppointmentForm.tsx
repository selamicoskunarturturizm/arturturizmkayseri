"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { createAppointment } from "@/features/appointments/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  full_name: z.string().min(3, "Ad Soyad en az 3 karakter olmalıdır"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  pax: z.coerce.number().min(1, "En az 1 kişi olmalıdır").max(20, "En fazla 20 kişi seçilebilir"),
})

type FormData = z.infer<typeof formSchema>

export function AppointmentForm({ tourId }: { tourId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { pax: 1 }
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    const toastId = toast.loading("Randevu talebiniz gönderiliyor...")
    
    const result = await createAppointment({ ...data, tour_id: tourId })
    
    if (result.success) {
      toast.success("Talebiniz başarıyla alındı. Sizinle iletişime geçeceğiz.", { id: toastId })
      reset()
    } else {
      toast.error(result.error || "Bir hata oluştu", { id: toastId })
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-amber-300 to-primary" />
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Yerinizi Ayırtın</h3>
        <p className="text-sm text-slate-500 font-light">Bilgilerinizi bırakın, seyahat danışmanlarımız size en kısa sürede ulaşsın.</p>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ad Soyad</label>
        <Input {...register("full_name")} placeholder="Örn: Ahmet Yılmaz" className="bg-slate-50 border-transparent hover:border-primary/30 focus:bg-white transition-all h-12 rounded-xl" />
        {errors.full_name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.full_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefon Numarası</label>
        <Input {...register("phone")} placeholder="05XX XXX XX XX" className="bg-slate-50 border-transparent hover:border-primary/30 focus:bg-white transition-all h-12 rounded-xl" />
        {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-Posta Adresi</label>
        <Input {...register("email")} type="email" placeholder="ornek@mail.com" className="bg-slate-50 border-transparent hover:border-primary/30 focus:bg-white transition-all h-12 rounded-xl" />
        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kişi Sayısı</label>
        <Input {...register("pax")} type="number" min="1" max="20" className="bg-slate-50 border-transparent hover:border-primary/30 focus:bg-white transition-all h-12 rounded-xl" />
        {errors.pax && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.pax.message}</p>}
      </div>

      <Button type="submit" className="w-full h-14 text-base mt-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" disabled={isSubmitting}>
        {isSubmitting ? "Gönderiliyor..." : "Randevu Talebi Oluştur"}
      </Button>
    </form>
  )
}
