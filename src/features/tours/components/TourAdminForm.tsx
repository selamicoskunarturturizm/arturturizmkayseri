"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createTour, updateTour } from "@/features/tours/actions"
import { uploadImageAction } from "@/features/tours/upload-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

export function TourAdminForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingState, setUploadingState] = useState<{ [key: string]: boolean }>({})

  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: "",
      slug: "",
      description: "",
      duration: 1,
      price: 1000,
      pricing: {
        room2: 1500,
        room3: 1450,
        room4: 1400,
        child: 950,
        baby: 600
      },
      image_url: "",
      is_active: true,
      flights: [
        { direction: "Gidiş", date: "", parkur: "İstanbul-Medine", flightNumber: "", departureTime: "", arrivalTime: "" }
      ],
      hotels: [
        { type: "MEKKE", name: "", nights: 5, distance: "0", image: "" },
        { type: "MEDİNE", name: "", nights: 3, distance: "0", image: "" }
      ]
    }
  })

  const { fields: flightFields, append: appendFlight, remove: removeFlight } = useFieldArray({
    control, name: "flights"
  })

  const { fields: hotelFields, append: appendHotel, remove: removeHotel } = useFieldArray({
    control, name: "hotels"
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, isMultiple = false) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploadingState(prev => ({ ...prev, [fieldName]: true }))
    toast.info("Görseller yükleniyor...")

    try {
      const urls: string[] = []
      
      for (let i = 0; i < e.target.files.length; i++) {
        const formData = new FormData()
        formData.append("file", e.target.files[i])
        const res = await uploadImageAction(formData)
        if (res.error) throw new Error(res.error)
        if (res.url) urls.push(res.url)
      }

      if (isMultiple) {
        const existingVal = watch(fieldName as any) || ""
        const combined = existingVal ? `${existingVal}, ${urls.join(", ")}` : urls.join(", ")
        setValue(fieldName as any, combined)
      } else {
        setValue(fieldName as any, urls[0])
      }
      
      toast.success("Görseller yüklendi!")
    } catch (error: any) {
      toast.error(error.message || "Yükleme hatası")
    } finally {
      setUploadingState(prev => ({ ...prev, [fieldName]: false }))
    }
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    // Slug boşsa başlıktan otomatik oluştur
    let finalSlug = data.slug;
    if (!finalSlug || finalSlug.trim() === "") {
      finalSlug = data.title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const formattedData = {
      ...data,
      slug: finalSlug,
      duration: Number(data.duration),
      price: Number(data.duration) === 14 ? 1400 : 1500,
      capacity: Number(data.capacity || 45),
      pricing: {
        room2: Number(data.duration) === 14 ? 1500 : 1600,
        room3: Number(data.duration) === 14 ? 1450 : 1550,
        room4: Number(data.duration) === 14 ? 1400 : 1500,
        child: 950,
        baby: 600,
      }
    }
    
    const result = initialData 
      ? await updateTour(initialData.id, formattedData)
      : await createTour(formattedData)

    if (result.success) {
      toast.success(initialData ? "Tur başarıyla güncellendi!" : "Tur başarıyla oluşturuldu!")
      router.push("/admin/tours")
      router.refresh()
    } else {
      toast.error(result.error)
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tur Adı</label>
          <Input {...register("title", { required: true })} placeholder="Örn: 15 Günlük Ekonomik Umre" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL (Slug) - İsteğe Bağlı</label>
          <Input {...register("slug")} placeholder="Boş bırakırsanız otomatik oluşturulur" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <textarea {...register("description", { required: true })} className="w-full min-h-[100px] p-3 border border-slate-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Süre (Gün)</label>
          <select {...register("duration", { required: true })} className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value={14}>14 Gün / 13 Gece</option>
            <option value={20}>20 Gün / 19 Gece</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Müsait Yer (Kontenjan)</label>
          <Input type="number" {...register("capacity")} defaultValue={45} placeholder="Örn: 45" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ana Görsel</label>
          <div className="flex items-center gap-3">
            <div className="relative inline-block">
              <Button type="button" variant="outline" disabled={uploadingState["image_url"]}>
                {uploadingState["image_url"] ? "Yükleniyor..." : "Cihazdan Seç"}
              </Button>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image_url")} className="absolute inset-0 opacity-0 cursor-pointer w-full" />
            </div>
            {watch("image_url") && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">✓ Yüklendi</span>}
            <input type="hidden" {...register("image_url")} />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" id="is_active" {...register("is_active")} className="h-4 w-4" />
          <label htmlFor="is_active" className="text-sm font-medium">Tur Aktif Mi?</label>
        </div>
      </div>

      <div className="pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
        <h3 className="text-lg font-bold md:col-span-2 mb-2">Sekme İçerikleri (Detay Sayfası)</h3>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Tur Programı</label>
          <textarea {...register("tour_program")} className="w-full min-h-[120px] p-3 border border-slate-300 rounded-md" placeholder="Gün gün tur programı detayları..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Havalimanı İrtibat Bilgileri</label>
          <textarea {...register("airport_contact")} className="w-full min-h-[100px] p-3 border border-slate-300 rounded-md" placeholder="Havalimanında karşılayacak personelin adı, telefonu vb." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mekke Otel Konumu</label>
          <textarea {...register("mecca_hotel_location")} className="w-full min-h-[100px] p-3 border border-slate-300 rounded-md" placeholder="Örn: Al Jawhara Tower Hotel Mecca (Direkt otel adını veya adresini yazabilirsiniz, harita otomatik çıkacaktır)" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Medine Otel Konumu</label>
          <textarea {...register("medina_hotel_location")} className="w-full min-h-[100px] p-3 border border-slate-300 rounded-md" placeholder="Örn: Mescid-i Nebevi yanı Medine (Direkt adres veya otel adı yazın)" />
        </div>
      </div>

      {/* Detaylı fiyatlandırma kaldırıldı - Sabit fiyatlar uygulanıyor */}

      <div className="pt-6 border-t">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Uçuş Bilgileri (Tablo)</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendFlight({ direction: "", date: "", parkur: "", flightNumber: "", departureTime: "", arrivalTime: "" })}>
            <Plus className="h-4 w-4 mr-1" /> Uçuş Ekle
          </Button>
        </div>
        <div className="space-y-4">
          {flightFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-6 gap-2 items-end border p-4 rounded-lg bg-slate-50 relative">
              <Button type="button" variant="ghost" size="sm" className="absolute top-2 right-2 text-red-500" onClick={() => removeFlight(index)}><Trash2 className="h-4 w-4" /></Button>
              <div><label className="text-xs font-semibold">Yön</label><Input {...register(`flights.${index}.direction`)} placeholder="Gidiş/Dönüş" /></div>
              <div><label className="text-xs font-semibold">Tarih</label><Input {...register(`flights.${index}.date`)} placeholder="15 Ekim..." /></div>
              <div><label className="text-xs font-semibold">Parkur</label><Input {...register(`flights.${index}.parkur`)} placeholder="İst-Med" /></div>
              <div><label className="text-xs font-semibold">Sefer No</label><Input {...register(`flights.${index}.flightNumber`)} placeholder="TK108" /></div>
              <div><label className="text-xs font-semibold">Kalkış</label><Input {...register(`flights.${index}.departureTime`)} placeholder="12:45" /></div>
              <div><label className="text-xs font-semibold">Varış</label><Input {...register(`flights.${index}.arrivalTime`)} placeholder="16:15" /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Otel Bilgileri</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendHotel({ type: "MEKKE", name: "", nights: 5, distance: "0", image: "" })}>
            <Plus className="h-4 w-4 mr-1" /> Otel Ekle
          </Button>
        </div>
        <div className="space-y-4">
          {hotelFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-5 gap-2 items-end border p-4 rounded-lg bg-emerald-50 relative">
              <Button type="button" variant="ghost" size="sm" className="absolute top-2 right-2 text-red-500" onClick={() => removeHotel(index)}><Trash2 className="h-4 w-4" /></Button>
              <div><label className="text-xs font-semibold">Bölge</label><Input {...register(`hotels.${index}.type`)} placeholder="MEKKE/MEDİNE" /></div>
              <div><label className="text-xs font-semibold">Otel Adı</label><Input {...register(`hotels.${index}.name`)} placeholder="Al Marwa..." /></div>
              <div><label className="text-xs font-semibold">Gece</label><Input type="number" {...register(`hotels.${index}.nights`)} /></div>
              <div><label className="text-xs font-semibold">Mesafe (mt)</label><Input {...register(`hotels.${index}.distance`)} placeholder="50" /></div>
              <div>
                <label className="text-xs font-semibold">Görsel</label>
                <div className="flex items-center gap-1 mt-1">
                  <div className="relative">
                    <Button type="button" variant="outline" size="sm" className="h-8 px-2 w-full text-xs" disabled={uploadingState[`hotels.${index}.image`]}>
                      {uploadingState[`hotels.${index}.image`] ? ".." : "+ Cihazdan"}
                    </Button>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, `hotels.${index}.image`)} className="absolute inset-0 opacity-0 cursor-pointer w-full" />
                  </div>
                  {watch(`hotels.${index}.image` as any) && <span className="text-emerald-500 font-bold ml-1">✓</span>}
                  <input type="hidden" {...register(`hotels.${index}.image`)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full h-12 text-lg bg-emerald-700 hover:bg-emerald-800 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Kaydediliyor..." : initialData ? "Değişiklikleri Kaydet" : "Turu Kaydet"}
      </Button>
    </form>
  )
}
