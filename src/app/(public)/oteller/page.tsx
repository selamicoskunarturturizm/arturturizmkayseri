import type { Metadata } from "next"
import { MapPin, Bus, Clock, ShieldCheck, Wifi, Coffee, Star, ChevronRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Otellerimiz | Artur Hac ve Umre Turizm",
  description:
    "Mekke ve Medine anlaşmalı otellerimiz. Al Jawhara Tower Hotel ile kutsal topraklarda 4 yıldız konforunda kalın.",
}

const highlights = [
  { icon: Bus,        label: "Ring Servisi",     desc: "Harem'e 5 dk" },
  { icon: Coffee,     label: "Açık Büfe",        desc: "Türk mutfağı" },
  { icon: Wifi,       label: "Ücretsiz Wi-Fi",   desc: "Tüm alanlarda" },
  { icon: ShieldCheck,label: "Hijyenik Odalar",   desc: "Günlük temizlik" },
  { icon: Clock,      label: "24 Saat Resepsiyon",desc: "Kesintisiz hizmet" },
  { icon: Star,       label: "4 Yıldız",         desc: "Sertifikalı konfor" },
]

const distances = [
  { name: "Kâbe (Mescid-i Haram)", dist: "~2.5 km", time: "5 dk", color: "bg-emerald-50 border-emerald-200 text-emerald-700", img: "/places/kabe.jpg" },
  { name: "Safa ve Merve",         dist: "~2.5 km", time: "İçeride", color: "bg-emerald-50 border-emerald-200 text-emerald-700", img: "/places/safa.jpg" },
  { name: "Nur Dağı (Hira)",       dist: "~6 km",   time: "10-15 dk", color: "bg-slate-50 border-slate-200 text-slate-700", img: "/places/hira.jpg" },
  { name: "Sevr Mağarası",         dist: "~8 km",   time: "15-20 dk", color: "bg-slate-50 border-slate-200 text-slate-700", img: "/places/sevr.jpg" },
  { name: "Arafat (Rahme Dağı)",   dist: "~18 km",  time: "25-30 dk", color: "bg-slate-50 border-slate-200 text-slate-700", img: "/places/arafat.jpg" },
  { name: "Müzdelife & Mina",      dist: "~4 km",   time: "Çok yakın", color: "bg-teal-50 border-teal-200 text-teal-700", img: "/places/mina.jpg" },
  { name: "Cennetü Muallâ",        dist: "~3.5 km", time: "10 dk", color: "bg-slate-50 border-slate-200 text-slate-700", img: "/places/mualla.jpg" },
  { name: "Cin Mescidi",           dist: "~3.5 km", time: "10 dk", color: "bg-slate-50 border-slate-200 text-slate-700", img: "/places/cin.jpg" },
]

const roomFeatures = [
  "İklimlendirme sistemi (split AC)",
  "Özel banyo ve duş kabini",
  "Minibar ve su servisi",
  "Güvenli kasa",
  "LCD televizyon",
  "Çalışma masası",
  "Bol depolama alanı",
  "Dua kilimi ve kıble yönü",
]

export default function OtellerPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/places/al-jawhara-tower.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        {/* Gold glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl py-32 md:py-44">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-semibold mb-6">
              <Star className="h-3.5 w-3.5 fill-primary" />
              Mekke - Mahbas Al Jinn
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Al Jawhara<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#D4AF37,#F5E6A3,#c4a030)" }}
              >
                Tower Hotel
              </span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed mb-10 max-w-2xl">
              Kutsal topraklardaki eviniz. 4 yıldız konforuyla huzur içinde ibadet edin,
              Harem'e 5 dakika mesafede dinlenin.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#tours"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-xl shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 transition-all duration-300"
                style={{ background: "linear-gradient(135deg,#D4AF37,#c4a030)" }}
              >
                Rezervasyon Yap <ChevronRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/905324493823"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Bilgi Al
              </a>
            </div>
          </div>
        </div>

        {/* Badge strip */}
        <div className="relative z-10 border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.label} className="flex flex-col items-center gap-1.5 py-5 px-3 text-center">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-white text-xs font-bold">{h.label}</span>
                    <span className="text-slate-500 text-[10px]">{h.desc}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Hotel Image + Description ──────────────────────────── */}
      <section className="container mx-auto px-4 md:px-8 max-w-7xl py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 group">
            <img
              src="/places/al-jawhara-tower.jpg"
              alt="Al Jawhara Tower Hotel"
              className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/90 to-transparent">
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                ))}
                <span className="text-white text-sm font-semibold ml-1">4 Yıldız Oteli</span>
              </div>
              <p className="text-slate-300 text-sm mt-1">Mahbas Al Jinn, Mekke-i Mükerreme</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
              Anlaşmalı Oteliimiz
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
              Kutsal Topraklarda<br />Huzurun Adresi
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              <strong>Al Jawhara Tower Hotel</strong>, Mekke-i Mükerreme'nin huzur dolu Mahbas Al Jinn bölgesinde yer almaktadır. Hac ve Umre ibadetleriniz boyunca evinizin konforunu aratmayacak ferah odalarımız, 24 saat kesintisiz ring servislerimiz ve güler yüzlü personelimizle manevi yolculuğunuza eşlik ediyoruz.
            </p>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Yorucu ibadetlerin ardından dinlenebileceğiniz nezih ortamımız, Türk damak tadına uygun zengin açık büfemiz ve yüksek hijyen standartlarımızla sizi ağırlamaktan onur duyarız.
            </p>

            {/* Room Features */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Oda Özellikleri</h3>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                {roomFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Cards ───────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Otelimizin{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#D4AF37,#c4a030)" }}
              >
                Ayrıcalıkları
              </span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              İbadete konsantre olabilmeniz için her detayı düşündük
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Bus,
                title: "24 Saat Ring Servisi",
                desc: "Klimalı otobüslerimizle Harem'in alt tünellerine (Bab Ali) sadece 5 dakikada ulaşım. Gece gündüz kesintisiz.",
                color: "bg-amber-50 border-amber-100",
                iconColor: "from-amber-400 to-amber-600",
              },
              {
                icon: ShieldCheck,
                title: "Hijyenik & Ferah Odalar",
                desc: "Günlük temizlenen, modern iklimlendirme sistemli, ailenizle huzur içinde kalabileceğiniz odalar.",
                color: "bg-emerald-50 border-emerald-100",
                iconColor: "from-emerald-400 to-emerald-600",
              },
              {
                icon: Coffee,
                title: "Türk Mutfağı Büfesi",
                desc: "Usta Türk aşçılarımız tarafından hazırlanan zengin sabah kahvaltısı ve akşam yemeği menüleri.",
                color: "bg-orange-50 border-orange-100",
                iconColor: "from-orange-400 to-orange-600",
              },
              {
                icon: Wifi,
                title: "Yüksek Hızlı Wi-Fi",
                desc: "Sevdiklerinizle iletişimde kalın. Tüm odalarda ve ortak alanlarda ücretsiz, kesintisiz internet.",
                color: "bg-blue-50 border-blue-100",
                iconColor: "from-blue-400 to-blue-600",
              },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className={`${card.color} border rounded-3xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${card.iconColor} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Distances ───────────────────────────────────────────── */}
      <section className="container mx-auto px-4 md:px-8 max-w-7xl py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            <MapPin className="inline h-7 w-7 text-primary mr-2 -mt-1" />
            Ziyaret Yerlerine Mesafeler
          </h2>
          <p className="text-slate-500">Otelimizden kutsal mekânlara ulaşım süreleri</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {distances.map((place) => (
            <div
              key={place.name}
              className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="h-44 overflow-hidden bg-slate-100">
                <img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-slate-800 text-sm mb-3 leading-snug">{place.name}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${place.color}`}>
                    {place.dist}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{place.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div
            className="inline-block h-16 w-16 rounded-2xl mb-6 shadow-xl"
            style={{ background: "linear-gradient(135deg,#D4AF37,#c4a030)" }}
          >
            <div className="h-full flex items-center justify-center">
              <Star className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Kutsal Topraklara<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg,#D4AF37,#F5E6A3,#c4a030)" }}
            >
              Birlikte Gidelim
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Al Jawhara Tower Hotel konforunda, Artur Turizm güvencesiyle unutulmaz bir hac veya umre yolculuğu için hemen rezervasyon yapın.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#tours"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all duration-300 text-lg"
              style={{ background: "linear-gradient(135deg,#D4AF37,#c4a030)" }}
            >
              Tur Paketlerini İncele <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
