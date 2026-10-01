"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: string
  url: string
  caption: string | null
  category: string | null
}

const CATEGORIES = [
  { value: "tumu", label: "Tumu" },
  { value: "genel", label: "Genel" },
  { value: "mekke", label: "Mekke" },
  { value: "medine", label: "Medine" },
  { value: "hac", label: "Hac" },
  { value: "umre", label: "Umre" },
  { value: "grup", label: "Grup Fotolari" },
]

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState("tumu")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = activeCategory === "tumu"
    ? images
    : images.filter((img) => img.category === activeCategory)

  const openLightbox = (idx: number) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % filtered.length : null))

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {CATEGORIES.map((cat) => {
          const count = cat.value === "tumu" ? images.length : images.filter((i) => i.category === cat.value).length
          if (cat.value !== "tumu" && count === 0) return null
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.value
                  ? "text-white shadow-lg shadow-primary/25"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary"
              }`}
              style={activeCategory === cat.value ? { background: "linear-gradient(135deg,#D4AF37,#c4a030)" } : {}}
            >
              {cat.label}
              <span className={`ml-1.5 text-xs ${activeCategory === cat.value ? "text-white/70" : "text-slate-400"}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Masonry Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-slate-400">Bu kategoride gorsel bulunmuyor.</div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((img, idx) => {
            const isVideo = img.url.match(/\.(mp4|webm|mov|ogg)$/i)
            return (
              <div
                key={img.id}
                className="break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(idx)}
              >
                {isVideo ? (
                  <video
                    src={img.url}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    muted loop playsInline onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                ) : (
                  <img
                    src={img.url}
                    alt={img.caption || "Galeri"}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium line-clamp-2">{img.caption}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox() }}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            {filtered[lightbox].url.match(/\.(mp4|webm|mov|ogg)$/i) ? (
              <video
                src={filtered[lightbox].url}
                controls
                autoPlay
                className="max-h-[75vh] max-w-full object-contain rounded-xl"
              />
            ) : (
              <img
                src={filtered[lightbox].url}
                alt={filtered[lightbox].caption || ""}
                className="max-h-[75vh] max-w-full object-contain rounded-xl"
              />
            )}
            {filtered[lightbox].caption && (
              <p className="text-white/80 text-sm text-center max-w-lg">{filtered[lightbox].caption}</p>
            )}
            <div className="text-white/40 text-xs">{lightbox + 1} / {filtered.length}</div>
          </div>
        </div>
      )}
    </>
  )
}