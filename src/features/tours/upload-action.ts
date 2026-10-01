"use server"

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File | null
  if (!file) {
    return { error: "Dosya bulunamadı." }
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`
  const uploadDir = join(process.cwd(), "public", "uploads")
  
  try {
    await mkdir(uploadDir, { recursive: true })
    const path = join(uploadDir, filename)
    await writeFile(path, buffer)
    return { url: `/uploads/${filename}` }
  } catch (error) {
    console.error("Error saving file:", error)
    return { error: "Dosya kaydedilemedi." }
  }
}
