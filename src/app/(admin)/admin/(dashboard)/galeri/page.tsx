import { getGalleryImages } from "@/features/gallery/actions"
import { GalleryAdminClient } from "./GalleryAdminClient"
import { ImageIcon } from "lucide-react"

export default async function AdminGalleriPage() {
  const images = await getGalleryImages()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ImageIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Galeri Yonetimi</h1>
          <p className="text-sm text-slate-500">Gorsel yukle, kategorile ve yonet</p>
        </div>
      </div>

      <GalleryAdminClient initialImages={images as any} />
    </div>
  )
}