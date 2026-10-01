import { ShieldCheck, Heart, Award, MapPin, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Hakkımızda | Artur Hac & Umre Turizm",
  description: "Yılların tecrübesiyle hac ve umre organizasyonlarında güvenilir rehberiniz.",
}

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-950 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary mb-6">
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Güvenilir Rehberiniz</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Kutsal Topraklara <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 text-transparent bg-clip-text">Huzurla Ulaşın</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Artur Turizm olarak yılların birikimi, uzman kadromuz ve sarsılmaz inancımızla,
            hayatınızın en anlamlı yolculuğunda size eşlik etmekten onur duyuyoruz.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Images */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 border-4 border-white shadow-xl relative group">
                <img
                  src="/selami-coskun.png"
                  alt="Selami Coşkun"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="font-bold text-2xl drop-shadow-md">Selami Coşkun</div>
                  <div className="text-primary font-medium text-sm">Kurucu & Yönetim Kurulu Başkanı</div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-800">20+</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yıllık Tecrübe</div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium">1989'dan bugüne güvenle...</p>
              </div>
            </div>

            {/* Right Side: Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Biz Kimiz?</h2>
              <div className="space-y-5 text-slate-600 leading-relaxed text-[15px] md:text-base">
                <p>
                  Artur Hac ve Umre Turizm olarak köklü geçmişimiz, kurucumuz Selami Coşkun'un yıllara sâri
                  tecrübesine ve maneviyatına dayanmaktadır. Kayseri Camii Kebir'de uzun yıllar din görevlisi olarak hizmet eden
                  Selami Coşkun, bu kutlu sektöre ilk adımını 1989 yılında Kayseri İl Müftülüğü'nün hac organizasyonlarında atmıştır.
                </p>
                <p>
                  Diyanet İşleri Başkanlığı bünyesinde uzun yıllar boyunca hac ve umre turlarında rehber olarak görev almış,
                  2002 yılında emekliliğe ayrıldıktan sonra Dinç Turizm Hac Seyahat Acentesi'nde çalışmalarına devam etmiştir.
                  Kayseri'de 20 yılı aşkın bir süre boyunca sayısız hacı ve umrecimize rehberlik etmiş, kutsal topraklarda
                  onların ibadetlerine şahitlik ve öncülük etmiştir.
                </p>
                <p>
                  Sektördeki uzun soluklu tecrübesi ve ortaklık sürecinin ardından, kendisine inanan ve güvenen misafirlerimizin
                  yoğun teveccühü ve talepleri üzerine <strong>2025</strong> yılında <strong>Artur Turizm Hac ve Umre Şirketi</strong>'ni
                  kurarak sektöre güçlü bir geri dönüş yapmıştır.
                </p>
                <blockquote className="border-l-4 border-primary pl-4 py-2 mt-6 bg-slate-50 rounded-r-lg italic text-slate-700">
                  "Amacımız; aynı ihlas, güven ve samimiyetle, Allah'ın ve Resulullah'ın misafirlerine en güzel şekilde
                  hizmet etmek, manevi yolculuklarında güvenilir rehberleri olmaya devam etmektir."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">Neden Bizi Seçmelisiniz?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Şeffaflık ve Güven</h3>
              <p className="text-slate-600 leading-relaxed">
                Kayıt anından dönüşünüze kadar hiçbir sürpriz maliyet çıkarılmaz. Vaat edilen oteller ve
                hizmetler eksiksiz sunulur.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">7/24 İlgi ve Alaka</h3>
              <p className="text-slate-600 leading-relaxed">
                Suudi Arabistan'da bulunduğunuz süre boyunca görevlilerimiz her an yanınızda olup ihtiyaçlarınızla ilgilenir.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Konforlu Ulaşım</h3>
              <p className="text-slate-600 leading-relaxed">
                En iyi hava yolları ile direkt veya konforlu aktarmalı uçuşlar, lüks ve klimalı otobüslerle şehir içi transferler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Manevi Yolculuğunuza Hazır mısınız?</h2>
          <p className="text-lg text-slate-300 mb-10">
            Aklınıza takılan tüm sorular, detaylı tur programları ve kayıt işlemleri için bizimle hemen iletişime geçin.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/#tours" className="px-8 py-4 rounded-full font-bold text-white shadow-lg hover:-translate-y-1 transition-transform" style={{ background: "linear-gradient(135deg,#D4AF37,#c4a030)" }}>
              Paketleri İnceleyin
            </Link>
            <a href="tel:+905324493823" className="px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 transition-colors">
              Bizi Arayın
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
