"use server"

import { prisma } from "@/lib/db"
import { unstable_noStore as noStore } from "next/cache"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir, unlink } from "fs/promises"
import { join } from "path"

export async function getGalleryImages(category?: string) {
  noStore()
  try {
    const images = await prisma.galleryImage.findMany({
      where: category && category !== "tumu" ? { category } : undefined,
      orderBy: [{ sort_order: "asc" }, { created_at: "desc" }],
    })
    return images
  } catch (error) {
    console.error("Gallery fetch error:", error)
    return []
  }
}

export async function uploadGalleryImage(formData: FormData) {
  const file = formData.get("file") as File | null
  const caption = formData.get("caption") as string | null
  const category = (formData.get("category") as string | null) || "genel"

  if (!file) return { error: "Dosya bulunamadi." }

  const allowedTypes = [
    "image/jpeg", "image/png", "image/webp", "image/gif",
    "video/mp4", "video/webm", "video/quicktime", "video/ogg"
  ]
  if (!allowedTypes.includes(file.type)) return { error: "Sadece görsel (JPG, PNG vb.) veya video (MP4, WEBM vb.) yükleyebilirsiniz." }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filename = `gallery-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`
  const uploadDir = join(process.cwd(), "public", "uploads", "gallery")

  try {
    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, filename), buffer)
    const url = `/uploads/gallery/${filename}`
    const image = await prisma.galleryImage.create({
      data: { url, caption: caption || null, category },
    })
    revalidatePath("/galeri")
    revalidatePath("/admin/galeri")
    return { success: true, image }
  } catch (error) {
    console.error("Gallery upload error:", error)
    return { error: "Gorsel yuklenemedi." }
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    const image = await prisma.galleryImage.findUnique({ where: { id } })
    if (!image) return { error: "Gorsel bulunamadi." }
    if (image.url.startsWith("/uploads/")) {
      const filePath = join(process.cwd(), "public", image.url)
      try { await unlink(filePath) } catch {}
    }
    await prisma.galleryImage.delete({ where: { id } })
    revalidatePath("/galeri")
    revalidatePath("/admin/galeri")
    return { success: true }
  } catch (error) {
    console.error("Gallery delete error:", error)
    return { error: "Gorsel silinemedi." }
  }
}

export async function updateGalleryImageCaption(id: string, caption: string, category: string) {
  try {
    await prisma.galleryImage.update({ where: { id }, data: { caption, category } })
    revalidatePath("/galeri")
    revalidatePath("/admin/galeri")
    return { success: true }
  } catch (error) {
    return { error: "Guncelleme basarisiz." }
  }
}