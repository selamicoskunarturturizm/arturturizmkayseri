"use client"

import { useState, useRef, useTransition } from "react"
import { uploadGalleryImage, deleteGalleryImage, updateGalleryImageCaption } from "@/features/gallery/actions"
import { Upload, Trash2, Tag, X, CheckCircle2, ImageIcon } from "lucide-react"
import { toast } from "sonner"

const CATEGORIES = [
  { value: "genel", label: "Genel" },
  { value: "mekke", label: "Mekke" },
  { value: "medine", label: "Medine" },
  { value: "hac", label: "Hac" },
  { value: "umre", label: "Umre" },
  { value: "grup", label: "Grup Fotolari" },
]

interface GalleryImage {
  id: string
  url: string
  caption: string | null
  category: string | null
  created_at: Date
}

export function GalleryAdminClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("genel")
  const [caption, setCaption] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editCaption, setEditCaption] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("caption", caption)
      fd.append("category", selectedCategory)
      const result = await uploadGalleryImage(fd)
      if (result.error) {
        toast.error(result.error)
      } else if (result.success && result.image) {
        setImages((prev) => [result.image as GalleryImage, ...prev])
        toast.success("Gorsel yuklendi!")
      }
    }
    setCaption("")
    setUploading(false)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Bu gorseli silmek istediginize emin misiniz?")) return
    startTransition(async () => {
      const result = await deleteGalleryImage(id)
      if (result.error) {
        toast.error(result.error)
      } else {
        setImages((prev) => prev.filter((img) => img.id !== id))
        toast.success("Gorsel silindi.")
      }
    })
  }

  const handleEdit = (img: GalleryImage) => {
    setEditingId(img.id)
    setEditCaption(img.caption || "")
    setEditCategory(img.category || "genel")
  }

  const handleSaveEdit = async () => {
    if (!editingId) return
    const result = await updateGalleryImageCaption(editingId, editCaption, editCategory)
    if (result.error) {
      toast.error(result.error)
    } else {
      setImages((prev) =>
        prev.map((img) =>
          img.id === editingId ? { ...img, caption: editCaption, category: editCategory } : img
        )
      )
      setEditingId(null)
      toast.success("Guncellendi.")
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Gorsel Yukle
        </h2>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
            dragOver ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <ImageIcon className={`h-12 w-12 mx-auto mb-3 ${dragOver ? "text-primary" : "text-slate-300"}`} />
          {uploading ? (
            <p className="text-primary font-semibold animate-pulse">Yükleniyor...</p>
          ) : (
            <>
              <p className="font-semibold text-slate-700">Görsel veya videoları buraya sürükleyip bırakın veya tıklayın</p>
              <p className="text-slate-400 text-sm mt-1">Görsel (JPG, PNG vb.) ve Video (MP4, WEBM vb.) — Çoklu seçim desteklenir</p>
            </>
          )}
        </div>

        {/* Caption + Category */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <input
            type="text"
            placeholder="Aciklama (opsiyonel)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1 h-10 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Image Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800 text-lg">Tum Gorseller ({images.length})</h2>
        </div>

        {images.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400">
            <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Henuz gorsel eklenmemis. Yukselikten yukleyin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((img) => {
              const isVideo = img.url.match(/\.(mp4|webm|mov|ogg)$/i)
              return (
                <div key={img.id} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden bg-black flex items-center justify-center">
                    {isVideo ? (
                      <video src={img.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted loop playsInline onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()} />
                    ) : (
                      <img src={img.url} alt={img.caption || "Galeri görseli"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>

                {/* Overlay actions */}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(img)}
                    className="h-7 w-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors"
                    title="Duzenle"
                  >
                    <Tag className="h-3.5 w-3.5 text-slate-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={isPending}
                    className="h-7 w-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>

                <div className="p-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">
                    {CATEGORIES.find((c) => c.value === img.category)?.label || img.category}
                  </div>
                  {img.caption && (
                    <p className="text-xs text-slate-600 line-clamp-2">{img.caption}</p>
                  )}
                </div>
              </div>
            )
          })}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Gorseli Duzenle</h3>
              <button onClick={() => setEditingId(null)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Aciklama</label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSaveEdit}
                className="w-full py-2.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,#D4AF37,#c4a030)" }}
              >
                <CheckCircle2 className="h-4 w-4" />
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}