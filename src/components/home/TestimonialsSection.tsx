"use client"

import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Fatma Hanım",
    city: "Kayseri",
    rating: 5,
    text: "Artur Turizm ile gittiğimiz umre seyahatinde her şey mükemmeldi. Hocamız son derece bilgili ve sabırlıydı. Otelimiz Mescid-i Haram'a çok yakındı. Herkese tavsiye ediyorum.",
    date: "Şubat 2026",
    initials: "FH",
  },
  {
    name: "Mehmet Bey",
    city: "İstanbul",
    rating: 5,
    text: "Rehberimiz sayesinde umrenin tüm detaylarını eksiksiz yerine getirdik. Organizasyon mükemmeldi, hiçbir sorunla karşılaşmadık. Uçaktan otele, transferlerden yemeklere her şey kusursuzdu.",
    date: "Ocak 2026",
    initials: "MB",
  },
  {
    name: "Ayşe Hanım",
    city: "Ankara",
    rating: 5,
    text: "Yıllardır bu firmayı bekliyordum. Türk damak tadına uygun yemekler, nezaket ve profesyonellik bir arada. İkinci kez gittiğimde de aynı kaliteyi gördüm.",
    date: "Mart 2026",
    initials: "AH",
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "text-primary" : "text-slate-200"}`}
          fill={i < count ? "currentColor" : "none"}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Yorumlar</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 text-serif">
            Misafirlerimiz Ne Diyor?
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-amber-400 mx-auto rounded-full mb-6" />
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Binlerce mutlu misafirimizden bazı deneyimler
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 group"
            >
              {/* Big quote */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-slate-100 group-hover:text-primary/10 transition-colors duration-500" fill="currentColor" />

              {/* Rating */}
              <StarRating count={t.rating} />

              {/* Text */}
              <p className="mt-5 text-slate-600 leading-relaxed text-sm">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl gradient-gold flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
                  <span className="text-white font-bold text-sm">{t.initials}</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{t.city}</span>
                    <span>·</span>
                    <span>{t.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
              ))}
            </div>
            <span className="text-slate-600 text-sm font-medium">
              <strong className="text-slate-900">4.9/5</strong> · 10.000+ değerlendirme
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
