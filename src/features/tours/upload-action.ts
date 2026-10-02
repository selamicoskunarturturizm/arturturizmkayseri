"use server"

import { createClient } from "@/lib/supabase/server"

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File | null
  if (!file) {
    return { error: "Dosya bulunamadı." }
  }

  const supabase = await createClient()

  // Sadece dosya uzantısını al
  const originalName = file.name
  const ext = originalName.substring(originalName.lastIndexOf('.'))
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`

  try {
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(`tours/${filename}`, file)

    if (error) {
      console.error("Supabase Upload Error:", error)
      return { error: "Dosya Supabase'e kaydedilemedi. ('uploads' adında public bir bucket olduğundan emin olun)" }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(`tours/${filename}`)

    return { url: publicUrl }
  } catch (error) {
    console.error("Error saving file:", error)
    return { error: "Sunucu hatası, dosya kaydedilemedi." }
  }
}
