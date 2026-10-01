import { getActiveTours } from "@/features/tours/actions"
import { TourCard } from "@/features/tours/components/TourCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ShieldCheck,
  Headphones,
  GraduationCap,
  Gift,
  Utensils,
  Users,
  Star,
  CheckCircle2,
  Award,
  Plane,
  MapPinned,
  Phone,
} from "lucide-react"
import { FaqSection } from "@/components/home/FaqSection"
import { StatsSection } from "@/components/home/StatsSection"

const features = [
  {
    icon: Plane,
    title: "Doğrudan Uçuş İmkanı",
    description: "30'dan fazla havalimanından aktarmasız, konforlu doğrudan uçuş imkanı ile seyahat edin.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Headphones,
    title: "Kesintisiz Rehberlik",
    description: "Her 40 kişiye özel frekans cihazı ve tecrübeli hocamız eşliğinde rehberlik hizmeti.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: GraduationCap,
    title: "Eğitim Seminerleri",
    description: "Umre ve hac öncesinde kapsamlı manevi hazırlık seminerleri ve rehberlik programları.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Gift,
    title: "Hediye Umreler",
    description: "Hudeybiye ve Cirane'den yapılan mikat ziyaretleriyle ekstra umre fırsatları.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Utensils,
    title: "Leziz Türk Yemekleri",
    description: "Helal kesim, Türk damak tadına uygun zengin yemek menüleri ile gönlünüzce yiyin.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Users,
    title: "Özel İlgilenme",
    description: "İbadetinizi eksiksiz yapabilmeniz için her 40 kişiye bir özel, deneyimli hoca.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
]

const packageTiers = [
  {
    name: "Ekonomik",
    color: "from-emerald-600 to-emerald-700",
    textColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    features: ["Konforlu otel", "Ring servisi", "Kahvaltı & akşam yemeği", "Rehber hizmeti"],
  },
  {
    name: "Gümüş",
    color: "from-slate-400 to-slate-600",
    textColor: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    features: ["Premium otel", "Yakın mesafe", "Tüm öğünler dahil", "Özel rehber"],
  },
  {
    name: "Altın",
    color: "from-primary to-amber-500",
    textColor: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    popular: true,
    features: ["5★ otel", "Harem'e çok yakın", "Tüm öğünler dahil", "VIP transfer", "Özel rehber"],
  },
  {
    name: "Platin",
    color: "from-slate-700 to-slate-900",
    textColor: "text-slate-800",
    bgColor: "bg-slate-900/5",
    borderColor: "border-slate-300",
    features: ["Lüks otel", "Harem avlusuna sıfır", "Tüm öğünler VIP", "Özel araç", "Kişisel rehber"],
  },
]

export default async function HomePage() {
  const tours = await getActiveTours()

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* ═══════════════════════════════════════════════
          HERO SECTION — Premium Full Screen
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full h-[92vh] min-h-[680px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Ken Burns */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110 animate-float-slow"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop')",
            animationDuration: "20s",
          }}
        />
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-slate-950/95" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30" />

        {/* Gold accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl z-10" />

        {/* Hero Content */}
        <div className="z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center pb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8 shadow-2xl">
            <Star className="h-4 w-4 text-primary" fill="currentColor" />
            <span className="text-sm font-semibold text-white tracking-wider">Tam Hizmet · Tam İbadet</span>
            <span className="hidden sm:block h-4 w-px bg-white/20" />
            <span className="hidden sm:block text-xs text-white/60">15 Yıllık Tecrübe</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[1.05] text-serif">
            Kutsal
            <span className="relative inline-block mx-3">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-300 to-primary">
                Topraklara
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </span>
            <br />Yolculuk
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Sünnet-i Seniyye&apos;ye uygun hizmet anlayışımız ve tecrübeli kadromuzla
            hac ve umre turlarında en yüksek standarttaki hizmeti sunuyoruz.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="h-14 px-8 text-base rounded-2xl font-bold bg-primary hover:bg-primary-hover text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <Link href="#tours">
                <MapPinned className="h-5 w-5 mr-2" />
                Umre Paketlerini İncele
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base rounded-2xl font-semibold bg-white/10 text-white border-white/25 hover:bg-white/20 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <Link href="/iletisim">
                <Phone className="h-5 w-5 mr-2" />
                Bize Ulaşın
              </Link>
            </Button>
          </div>

          {/* Trust indicators below CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>TÜRSAB Onaylı</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>Diyanet Yetkili</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" fill="currentColor" />
              <span>10.000+ Mutlu Misafir</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce opacity-60">
          <span className="text-[10px] text-white uppercase tracking-widest font-medium">Keşfet</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS SECTION — Animated Counters
      ═══════════════════════════════════════════════ */}
      <StatsSection />

      {/* ═══════════════════════════════════════════════
          PACKAGES OVERVIEW — Tier Comparison
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Paket Seçenekleri</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-serif">
              Bütçenize Uygun Paket Seçin
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Her paketimizde aynı manevi kaliteyi, farklı konfor ve otel seçenekleriyle sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {packageTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-6 border-2 ${tier.borderColor} ${tier.bgColor} hover:-translate-y-2 transition-all duration-500 group`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30 whitespace-nowrap">
                      En Popüler
                    </span>
                  </div>
                )}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${tier.color} mb-5`}>
                  <span className="text-white text-sm font-bold">{tier.name}</span>
                </div>
                <ul className="space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${tier.textColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="rounded-2xl px-8 h-12 bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
              <Link href="#tours">Tüm Paketleri Gör</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TOURS SECTION
      ═══════════════════════════════════════════════ */}
      <section id="tours" className="py-24 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Güncel Programlar</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 text-serif">
              Öne Çıkan Hac ve Umre Turları
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-amber-400 mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Ekonomik, Gümüş, Altın ve Platin seçenekleriyle bütçenize ve beklentinize en uygun programı seçin.
            </p>
          </div>

          {tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour: any) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MapPinned className="h-10 w-10 text-primary" />
              </div>
              <p className="text-xl font-bold text-slate-700 mb-2">Yakında Yeni Programlar</p>
              <p className="text-slate-400 mb-8">Şu an için aktif tur programı bulunmamaktadır. Lütfen daha sonra tekrar kontrol edin.</p>
              <Button asChild variant="outline" className="rounded-2xl border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                <Link href="/iletisim">Bildirim Al</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY US SECTION — Redesigned
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Neden Artur Turizm?</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight text-serif">
                Kutsal Yolculuğunuzda
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500"> En İyisi</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                15 yılı aşkın tecrübemiz, 10.000&apos;den fazla memnun misafirimiz ve titizlikle seçilmiş hizmet kadromuzla sektörün en güvenilir hac ve umre acentesiyiz.
              </p>
              <ul className="space-y-4 mb-10">
                {["Diyanet onaylı, TÜRSAB lisanslı acente", "Her 40 kişiye özel tecrübeli hoca", "5 yıldızlı oteller ve premium konaklama", "7/24 müşteri destek hattı"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="rounded-2xl px-7 h-12 bg-primary hover:bg-primary-hover text-white font-bold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                  <Link href="/#tours">Paketleri İncele</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl px-7 h-12 border-slate-200 hover:border-primary hover:text-primary transition-all duration-300">
                  <Link href="/iletisim">İletişime Geç</Link>
                </Button>
              </div>
            </div>

            {/* Right: Feature Cards */}
            <div className="grid grid-cols-2 gap-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-500"
                >
                  <div className={`h-12 w-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">{feature.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════ */}
      <FaqSection />

      {/* ═══════════════════════════════════════════════
          CTA BANNER — Full Width Premium
      ═══════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">

          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-serif leading-[1.15]">
            Ömrünüzün En Anlamlı Yolculuğuna <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-primary to-amber-400 drop-shadow-sm">Huzurla Adım Atın</span>
          </h2>

          <p className="text-slate-300 leading-relaxed text-lg md:text-xl mb-12 font-light">
            Artur Turizm'in 35 yıllık tecrübesi, konforlu konaklama seçenekleri ve Diyanet görevlisi
            tecrübeli hocalarımız eşliğinde ibadetlerinizi sünnete uygun, eksiksiz bir şekilde eda edin.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button asChild size="lg" className="h-16 px-10 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)] hover:shadow-[0_0_60px_-15px_rgba(212,175,55,0.7)] hover:-translate-y-1 transition-all duration-300">
              <Link href="/#tours">
                Güncel Turları İncele
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-16 px-10 rounded-full bg-white/5 border-white/20 text-white font-semibold text-lg hover:bg-white/10 backdrop-blur-md hover:-translate-y-1 transition-all duration-300">
              <a href="tel:+905324493823">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                Müşteri Temsilcisini Ara
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
