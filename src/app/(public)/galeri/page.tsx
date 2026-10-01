import type { Metadata } from "next"
import { getGalleryImages } from "@/features/gallery/actions"
import { GalleryClient } from "./GalleryClient"
import { ImageIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Galeri | Artur Hac ve Umre Turizm",
  description: "Hac ve Umre turlarimizdan fotograf ve anilari inceleyin. Kutsal topraklardaki unutulmaz anlarin gorselleri.",
}

export default async function GaleriPage() {
  const images = await getGalleryImages()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-slate-950 overflow-hidden py-24 md:py-32">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-semibold mb-6">
            <ImageIcon className="h-4 w-4" />
            Fotograflar
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-5">
            Kutsal{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#D4AF37,#F5E6A3,#c4a030)" }}>
              Anlar
            </span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Hac ve Umre turlarimizdan unutulmaz anlarin gorselleri. Her fotograf bir ibadetin, bir aninin izlerini tasiyor.
          </p>
          <div className="mt-6 text-slate-500 text-sm font-semibold">{images.length} Gorsel</div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 md:px-8 max-w-7xl py-16">
        {images.length === 0 ? (
          <div className="text-center py-32">
            <div className="h-20 w-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="h-10 w-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Yakinida Gorsel Eklenecek</h2>
            <p className="text-slate-400">Hac ve umre turlarimiza ait fotograf ve videolar burada paylasılacaktir.</p>
          </div>
        ) : (
          <GalleryClient images={images as any} />
        )}
      </section>
    </div>
  )
}