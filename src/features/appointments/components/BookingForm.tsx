"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { createAppointment } from "@/features/appointments/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Printer, CheckCircle2 } from "lucide-react"

const passengerSchema = z.object({
  tc: z.string().min(11, "TC Kimlik No 11 haneli olmalıdır").max(11),
  firstName: z.string().min(2, "Ad gerekli"),
  lastName: z.string().min(2, "Soyad gerekli"),
  dob: z.string().min(1, "Doğum tarihi gerekli"),
  phone: z.string().min(10, "Telefon numarası gerekli"),
  email: z.string().email("Geçerli bir e-posta giriniz"),
  notes: z.string().optional(),
})

const formSchema = z.object({
  roomCount: z.coerce.number().min(1),
  roomType: z.string(),
  adults: z.coerce.number().min(1),
  children: z.coerce.number().default(0),
  babies: z.coerce.number().default(0),
  paymentMethod: z.enum(["card", "transfer"]).default("transfer"),
  passengers: z.array(passengerSchema),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Şartları kabul etmelisiniz",
  }),
})

type BookingFormValues = z.infer<typeof formSchema>

export function BookingForm({ tourId, basePrice, duration = 14, pricing }: { tourId: string; basePrice: number; duration?: number; pricing?: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomCount: 1,
      roomType: "2_kisilik",
      adults: 2,
      children: 0,
      babies: 0,
      paymentMethod: "transfer",
      passengers: [
        { tc: "", firstName: "", lastName: "", dob: "", phone: "", email: "", notes: "" },
        { tc: "", firstName: "", lastName: "", dob: "", phone: "", email: "", notes: "" },
      ],
      termsAccepted: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  })

  const adults = Number(watch("adults"))
  const children = Number(watch("children"))
  const babies = Number(watch("babies"))
  const paymentMethod = watch("paymentMethod")
  const roomType = watch("roomType")
  const roomCount = Number(watch("roomCount"))

  const roomCapacity = roomType === "2_kisilik" ? 2 : roomType === "3_kisilik" ? 3 : 4
  const maxBeds = roomCount * roomCapacity

  useEffect(() => {
    if (adults + children > maxBeds) {
      if (adults > maxBeds) {
        setValue("adults", maxBeds)
        setValue("children", 0)
      } else {
        setValue("children", maxBeds - adults)
      }
    }
  }, [maxBeds, adults, children, setValue])

  const totalPax = adults + children + babies

  // Dynamic passengers adjust based on pax
  if (totalPax > fields.length) {
    for (let i = 0; i < totalPax - fields.length; i++) {
      append({ tc: "", firstName: "", lastName: "", dob: "", phone: "", email: "", notes: "" })
    }
  } else if (totalPax < fields.length) {
    for (let i = fields.length - 1; i >= totalPax; i--) {
      remove(i)
    }
  }

  // Dynamic pricing calculation based on business rules OR DB JSON
  let adultPrice = basePrice;
  if (pricing && pricing.room2) {
    if (roomType === "2_kisilik") adultPrice = Number(pricing.room2) || basePrice;
    else if (roomType === "3_kisilik") adultPrice = Number(pricing.room3) || basePrice;
    else if (roomType === "4_kisilik") adultPrice = Number(pricing.room4) || basePrice;
  } else if (duration === 14) {
    if (roomType === "2_kisilik") adultPrice = 1500;
    else if (roomType === "3_kisilik") adultPrice = 1450;
    else if (roomType === "4_kisilik") adultPrice = 1400;
  } else if (duration === 20) {
    if (roomType === "2_kisilik") adultPrice = 1600;
    else if (roomType === "3_kisilik") adultPrice = 1550;
    else if (roomType === "4_kisilik") adultPrice = 1500;
  } else {
    // Fallback if other duration and no pricing object
    if (roomType === "3_kisilik") adultPrice = basePrice - 50;
    else if (roomType === "4_kisilik") adultPrice = basePrice - 100;
  }

  const childPrice = (pricing && pricing.child) ? Number(pricing.child) : 950;
  const babyPrice = (pricing && pricing.baby) ? Number(pricing.baby) : 600;

  const baseTotalPrice = (adults * adultPrice) + (children * childPrice) + (babies * babyPrice)
  const commissionAmount = baseTotalPrice * 0.025; // 2.5% fee
  const totalPrice = paymentMethod === "card" ? baseTotalPrice + commissionAmount : baseTotalPrice

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true)
    const toastId = toast.loading("Rezervasyon talebiniz işleniyor...")

    // First passenger is considered the main contact
    const mainPassenger = data.passengers[0]

    const result = await createAppointment({
      tour_id: tourId,
      full_name: `${mainPassenger.firstName} ${mainPassenger.lastName}`,
      phone: mainPassenger.phone || "Belirtilmedi",
      email: mainPassenger.email || "Belirtilmedi",
      pax: totalPax,
      room_type: data.roomType,
      room_count: data.roomCount,
      total_price: totalPrice,
      payment_method: data.paymentMethod,
      passengers: data.passengers,
    })

    if (result.success) {
      if (result.checkoutUrl) {
        toast.success("Rezervasyon alındı. Ödeme sayfasına yönlendiriliyorsunuz...", { id: toastId })
        window.location.href = result.checkoutUrl
      } else {
        toast.success("Talebiniz başarıyla alındı. Sizinle iletişime geçeceğiz.", { id: toastId })
        setIsSuccess(true)
      }
    } else {
      toast.error(result.error || "Bir hata oluştu", { id: toastId })
    }
    setIsSubmitting(false)
  }

  const handlePrint = () => {
    const mainPassenger = watch("passengers")[0]
    const allPassengers = watch("passengers")
    const date = new Date().toLocaleDateString("tr-TR")
    const rType = watch("roomType") === "2_kisilik" ? "2 Kişilik" : watch("roomType") === "3_kisilik" ? "3 Kişilik" : "4 Kişilik"

    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    const content = `
      <html>
        <head>
          <title>Artur Turizm - Rezervasyon Fişi</title>
          <style>
            body { font-family: 'Arial', sans-serif; padding: 40px; color: #333; line-height: 1.6; }
            .header { border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .title { color: #059669; font-size: 28px; font-weight: bold; }
            .doc-title { font-size: 16px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
            .success-box { background-color: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
            .success-box h2 { color: #047857; margin-top: 0; }
            .details { margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 8px; }
            .details p { margin: 8px 0; font-size: 15px; }
            .passengers table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .passengers th, .passengers td { border: 1px solid #cbd5e1; padding: 12px; text-align: left; font-size: 14px; }
            .passengers th { background-color: #f1f5f9; color: #334155; }
            .footer { margin-top: 50px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Artur Turizm</div>
            <div class="doc-title">Ön Kayıt Referans Belgesi</div>
          </div>
          
          <div class="success-box">
            <h2>✓ Ön Kayıt Başarılı</h2>
            <p>Sayın <strong>${mainPassenger?.firstName || ""} ${mainPassenger?.lastName || ""}</strong>, talebiniz sistemimize başarıyla ulaşmıştır. Müşteri temsilcilerimiz en kısa sürede sizinle iletişime geçecektir.</p>
          </div>

          <div class="details">
            <h3 style="margin-top:0; border-bottom: 1px solid #e2e8f0; padding-bottom:10px; margin-bottom:15px;">Kayıt Detayları</h3>
            <p><strong>İletişim Numarası:</strong> ${mainPassenger?.phone || "Belirtilmedi"}</p>
            <p><strong>Oda Tercihi:</strong> ${watch("roomCount")} x ${rType} Oda</p>
            <p><strong>Toplam Kişi:</strong> ${totalPax} Yolcu</p>
            <p><strong>İşlem Tarihi:</strong> ${date}</p>
            <p><strong>Toplam Tutar:</strong> ${totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </div>

          <div class="passengers">
            <h3>Yolcu Listesi</h3>
            <table>
              <thead>
                <tr>
                  <th>TC Kimlik No</th>
                  <th>Ad Soyad</th>
                  <th>Doğum Tarihi</th>
                </tr>
              </thead>
              <tbody>
                ${allPassengers.map(p => `
                  <tr>
                    <td>${p.tc || "-"}</td>
                    <td>${p.firstName || "-"} ${p.lastName || "-"}</td>
                    <td>${p.dob || "-"}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="footer">
            <strong>Artur Turizm Hac ve Umre Organizasyon Ltd. Şti.</strong><br/>
            Adres: Hunat Mah. Nuh Naci Yazgan Cad. Neşe Apt. (Eski Verem Hastanesi Karşısı) Kayseri<br/>
            Telefon: +90 532 449 38 23 | E-posta: selamicoskunarturturizm@gmail.com<br/>
            <em>Bu belge bilgi amaçlıdır, kesin kayıt yerine geçmez.</em>
          </div>
        </body>
      </html>
    `

    if (iframe.contentWindow) {
      iframe.contentWindow.document.open()
      iframe.contentWindow.document.write(content)
      iframe.contentWindow.document.close()

      iframe.contentWindow.focus()
      iframe.contentWindow.print()

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-emerald-200 overflow-hidden text-center p-12">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4">Ön Kayıt Başarılı!</h3>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Talebiniz başarıyla alınmıştır. Müşteri temsilcilerimiz en kısa sürede sizinle iletişime geçecektir. Bu sayfayı referans (kanıt) olarak bilgisayarınıza veya telefonunuza kaydedebilirsiniz.
        </p>
        <Button onClick={handlePrint} className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-700/20">
          <Printer className="mr-2 h-5 w-5" />
          Yazdır / PDF Olarak İndir
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
        <h3 className="font-bold text-lg">Satın Alma Formu</h3>
        <span className="font-bold text-emerald-400">Güncel Fiyatlama <span className="text-sm font-normal text-slate-400">/ Seçime Göre Değişir</span></span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">


        <div className="flex flex-wrap gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Oda Sayısı</label>
            <select {...register("roomCount")} className="h-10 px-3 rounded-md border border-slate-300 bg-white">
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Oda Tipi</label>
            <select {...register("roomType")} className="h-10 px-3 rounded-md border border-slate-300 bg-white min-w-[150px]">
              <option value="2_kisilik">2 Kişilik Oda</option>
              <option value="3_kisilik">3 Kişilik Oda</option>
              <option value="4_kisilik">4 Kişilik Oda</option>
            </select>
          </div>

          <div className="flex gap-2 ml-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Yetişkin</label>
              <select {...register("adults")} className="h-10 px-3 rounded-md border border-slate-300 bg-white">
                {Array.from({ length: maxBeds }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Çocuk (2-11 Yaş)</label>
              <select {...register("children")} className="h-10 px-3 rounded-md border border-slate-300 bg-white">
                {Array.from({ length: Math.max(0, maxBeds - adults + 1) }, (_, i) => i).map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Bebek (0-2 Yaş)</label>
              <select {...register("babies")} className="h-10 px-3 rounded-md border border-slate-300 bg-white">
                {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
        </div>



        {/* Passengers details table-like layout */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-700 border-b pb-2">Yolcu Bilgileri</h4>

          <div className="hidden md:grid grid-cols-7 gap-2 bg-emerald-700 text-white text-xs font-bold p-3 rounded-t-lg">
            <div>TC Kimlik No</div>
            <div>Ad</div>
            <div>Soyad</div>
            <div>Doğum Tarihi</div>
            <div>Cep Telefonu</div>
            <div>E-posta</div>
            <div>Açıklama</div>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-start border md:border-0 md:border-b border-slate-200 p-4 md:p-0 md:pb-2 rounded-lg md:rounded-none relative">

                {/* Mobile Label */}
                <div className="md:hidden absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-emerald-700">Yolcu {index + 1}</div>

                <div>
                  <Input {...register(`passengers.${index}.tc`)} placeholder="TC Kimlik" className="h-9 text-sm" />
                  {errors.passengers?.[index]?.tc && <span className="text-[10px] text-red-500">{errors.passengers[index]?.tc?.message}</span>}
                </div>
                <div>
                  <Input {...register(`passengers.${index}.firstName`)} placeholder="Ad" className="h-9 text-sm" />
                  {errors.passengers?.[index]?.firstName && <span className="text-[10px] text-red-500">{errors.passengers[index]?.firstName?.message}</span>}
                </div>
                <div>
                  <Input {...register(`passengers.${index}.lastName`)} placeholder="Soyad" className="h-9 text-sm" />
                  {errors.passengers?.[index]?.lastName && <span className="text-[10px] text-red-500">{errors.passengers[index]?.lastName?.message}</span>}
                </div>
                <div>
                  <Input {...register(`passengers.${index}.dob`)} placeholder="gg.aa.yyyy" className="h-9 text-sm" />
                  {errors.passengers?.[index]?.dob && <span className="text-[10px] text-red-500">{errors.passengers[index]?.dob?.message}</span>}
                </div>
                <div>
                  <Input {...register(`passengers.${index}.phone`)} placeholder="05XX" className="h-9 text-sm" />
                  {errors.passengers?.[index]?.phone && <span className="text-[10px] text-red-500">{errors.passengers[index]?.phone?.message}</span>}
                </div>
                <div>
                  <Input {...register(`passengers.${index}.email`)} placeholder="E-posta" className="h-9 text-sm" />
                  {errors.passengers?.[index]?.email && <span className="text-[10px] text-red-500">{errors.passengers[index]?.email?.message}</span>}
                </div>
                <div>
                  <Input {...register(`passengers.${index}.notes`)} placeholder="Açıklama" className="h-9 text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer & Submit */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-slate-50 p-4 rounded-lg gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" {...register("termsAccepted")} className="h-4 w-4 text-emerald-600 rounded border-slate-300" />
            <label htmlFor="terms" className="text-sm text-slate-600">
              <a href="#" className="text-emerald-700 underline font-medium">Umre sözleşmesini</a> ve çocuk fiyatları notunu okudum.
            </label>
            {errors.termsAccepted && <span className="text-xs text-red-500 ml-2">{errors.termsAccepted.message}</span>}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button type="button" variant="outline" onClick={() => reset()} className="w-full md:w-auto text-slate-500">Temizle</Button>
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8">
              {isSubmitting ? "İşleniyor..." : "Ön Kayıt Oluştur"}
            </Button>
          </div>
        </div>

      </form>
    </div>
  )
}
