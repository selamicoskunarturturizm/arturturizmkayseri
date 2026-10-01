"use client"

import Link from "next/link"
import { Calendar, MapPin, ArrowRight, Clock, Star, Users } from "lucide-react"

interface TourCardProps {
  tour: {
    id: string
    title: string
    slug: string
    description: string
    duration: number
    price: number
    image_url: string | null
  }
}

// Derive badge/tier from title keywords
function getTierBadge(title: string) {
  const lower = title.toLowerCase()
  if (lower.includes("platin")) return { label: "Platin", color: "from-slate-600 to-slate-800", textColor: "text-white" }
  if (lower.includes("altın") || lower.includes("altin") || lower.includes("gold")) return { label: "Altın", color: "from-primary to-amber-500", textColor: "text-white" }
  if (lower.includes("gümüş") || lower.includes("gumus") || lower.includes("silver")) return { label: "Gümüş", color: "from-slate-400 to-slate-500", textColor: "text-white" }
  if (lower.includes("ekonomik")) return { label: "Ekonomik", color: "from-emerald-600 to-emerald-700", textColor: "text-white" }
  return null
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price)
}

export function TourCard({ tour }: TourCardProps) {
  const badge = getTierBadge(tour.title)

  return (
    <Link href={`/tours/${tour.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-slate-100/80 hover:border-primary/20 relative hover:-translate-y-2">

        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {tour.image_url ? (
            <img
              src={tour.image_url}
              alt={tour.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <span className="text-slate-400 text-sm">Görsel Yükleniyor</span>
              </div>
            </div>
          )}

          {/* Top badge */}
          {badge && (
            <div className="absolute top-4 left-4 z-20">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${badge.color} ${badge.textColor} shadow-lg`}>
                <Star className="h-3 w-3" fill="currentColor" />
                {badge.label}
              </span>
            </div>
          )}

          {/* Duration badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold">
              <Clock className="h-3 w-3" />
              {tour.duration} Gün
            </div>
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <Users className="h-3.5 w-3.5" />
              <span>Grup Turu</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6 relative bg-white">
          {/* Location pill */}
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-3">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Mekke · Medine</span>
          </div>

          <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 leading-snug text-serif">
            {tour.title}
          </h3>

          <p className="mb-5 text-slate-500 text-sm line-clamp-2 flex-grow leading-relaxed">
            {tour.description}
          </p>

          {/* Price + CTA */}
          <div className="mt-auto">
            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-5" />

            <div className="flex items-center justify-between">
              <div>
                {tour.price > 0 ? (
                  <>
                    <div className="text-xs text-slate-400 font-medium mb-0.5">Kişi başı fiyat</div>
                    <div className="text-2xl font-extrabold text-slate-900">
                      {formatPrice(tour.price)}
                    </div>
                  </>
                ) : (
                  <div className="text-sm font-semibold text-slate-500">Fiyat için iletişim</div>
                )}
              </div>

              <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all duration-300">
                <span>İncele</span>
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-amber-400 transition-all duration-500 rounded-b-3xl" />
      </article>
    </Link>
  )
}
