import { notFound } from "next/navigation"
import { getTourBySlug } from "@/features/tours/actions"
import { BookingForm } from "@/features/appointments/components/BookingForm"
import { TourTabsClient } from "@/features/tours/components/TourTabsClient"
import { Clock, MapPin, Users, Star, ChevronRight, ShieldCheck } from "lucide-react"
import Link from "next/link"

function getTierBadge(title: string) {
  const lower = title.toLowerCase()
  if (lower.includes("platin")) return { label: "Platin", color: "from-slate-600 to-slate-800" }
  if (lower.includes("altin") || lower.includes("gold")) return { label: "Altin", color: "from-amber-400 to-amber-600" }
  if (lower.includes("gumus") || lower.includes("silver")) return { label: "Gumus", color: "from-slate-400 to-slate-500" }
  if (lower.includes("ekonomik")) return { label: "Ekonomik", color: "from-emerald-500 to-emerald-700" }
  return null
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const resolvedParams = await params
  const slugStr = Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join("/") : resolvedParams.slug
  const tour = await getTourBySlug(slugStr)
  if (!tour) notFound()
  const badge = getTierBadge(tour.title)
  const capacity = tour.capacity ?? 45

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative bg-slate-950 overflow-hidden">
        {tour.image_url && (
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('${tour.image_url}')` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/70 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl pt-14 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Ana Sayfa</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/#tours" className="hover:text-slate-300 transition-colors">Tur Paketleri</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-400">{tour.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Tour info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {badge && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${badge.color} text-white shadow-lg`}>
                    <Star className="h-3 w-3 fill-white" />
                    {badge.label}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-semibold">
                  <Clock className="h-3 w-3" />
                  {tour.duration} Gun
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-semibold">
                  <MapPin className="h-3 w-3" />
                  Mekke - Medine
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">{tour.title}</h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl">{tour.description}</p>
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  TURSAB Onaylu
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Users className="h-4 w-4" />
                  Musait Kapasite: <strong className="text-white ml-1">{capacity}</strong>
                </div>
              </div>
            </div>

            {/* Price card */}
            <div className="lg:col-span-1">
              {tour.price > 0 ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">Kisi Basi Baslangic</div>
                  <div className="text-4xl font-extrabold text-transparent bg-clip-text mb-1" style={{ backgroundImage: "linear-gradient(135deg,#D4AF37,#F5E6A3,#c4a030)" }}>
                    {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(tour.price)}
                  </div>
                  <div className="text-slate-500 text-xs mb-5">Oda tipine gore degisebilir</div>
                  <a href="#rezervasyon" className="block w-full py-3 rounded-2xl font-bold text-white text-sm shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300" style={{ background: "linear-gradient(135deg,#D4AF37,#c4a030)" }}>
                    Hemen Rezervasyon Yap
                  </a>
                  <a href="https://wa.me/905324493823" target="_blank" rel="noopener noreferrer" className="block w-full py-3 mt-2 rounded-2xl font-semibold text-white/80 text-sm bg-white/10 border border-white/10 hover:bg-white/15 transition-all duration-300">
                    WhatsApp ile Bilgi Al
                  </a>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center">
                  <div className="text-slate-300 font-semibold mb-4">Fiyat icin iletisime gecin</div>
                  <a href="tel:+905324493823" className="block w-full py-3 rounded-2xl font-bold text-white text-sm" style={{ background: "linear-gradient(135deg,#D4AF37,#c4a030)" }}>
                    +90 532 449 38 23
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + Booking */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-10">
        <TourTabsClient
          flights={tour.flights as any[]}
          hotels={tour.hotels as any[]}
          tourProgram={tour.tour_program}
          airportContact={tour.airport_contact}
          meccaLocation={tour.mecca_hotel_location}
          medinaLocation={tour.medina_hotel_location}
        />
        <div id="rezervasyon" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest px-3">Rezervasyon Formu</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </div>
          <BookingForm tourId={tour.id} basePrice={tour.price} duration={tour.duration} pricing={tour.pricing} />
        </div>
      </div>
    </div>
  )
}