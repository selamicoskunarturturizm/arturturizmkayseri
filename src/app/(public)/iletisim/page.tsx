import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "İletişim | Artur Hac ve Umre Turizm",
  description:
    "Hac ve Umre programları hakkında bilgi almak için bize ulaşın. 7/24 destek hattımız ve WhatsApp iletişim kanalımızla yanınızdayız.",
}

const contactCards = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 532 449 38 23",
    sub: "7/24 Destek Hattı",
    href: "tel:+905324493823",
    color: "from-amber-400 to-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-700",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+90 532 449 38 23",
    sub: "Anında mesaj gönderin",
    href: "https://wa.me/905324493823",
    color: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-700",
  },
  {
    icon: Mail,
    label: "E-Posta",
    value: "selamicoskunarturturizm@gmail.com",
    sub: "En geç 24 saat içinde dönüş",
    href: "mailto:selamicoskunarturturizm@gmail.com",
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-700",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Hunat Mah. Nuh Naci Yazgan Cad. Neşe Apt.",
    sub: "Eski Verem Hastanesi Karşısı, Kayseri",
    href: "https://maps.google.com/?q=Hunat+Mahallesi+Nuh+Naci+Yazgan+Kayseri",
    color: "from-rose-400 to-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-700",
  },
]

const workingHours = [
  { day: "Pazartesi – Cuma", hours: "09:00 – 18:00" },
  { day: "Cumartesi", hours: "09:00 – 14:00" },
  { day: "Pazar", hours: "Kapalı" },
]

const faqs = [
  {
    q: "Umre vizesi için ne kadar süre gerekiyor?",
    a: "Umre vize işlemleri genellikle 7-10 iş günü sürmektedir. Gerekli belgelerle birlikte en az 3 hafta öncesinden başvurmanızı tavsiye ederiz.",
  },
  {
    q: "Tur paketleri kaç kişiden oluşuyor?",
    a: "Gruplarımız genellikle 20-45 kişiden oluşmaktadır. Aile ve özel gruplar için kişiselleştirilmiş paketler de sunuyoruz.",
  },
  {
    q: "Ödeme planı mevcut mu?",
    a: "Evet, rezervasyon ücretinin %30u kaparo olarak alınmakta; kalan tutar tura 30 gün kala tamamlanmaktadır. Taksitli ödeme seçenekleri için bizimle iletişime geçiniz.",
  },
  {
    q: "Seyahat sigortası dahil mi?",
    a: "Tüm paketlerimize seyahat sağlık sigortası dahildir. Genişletilmiş sigorta seçenekleri için danışmanlarımızla görüşebilirsiniz.",
  },
]

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-slate-950 overflow-hidden py-28 md:py-36">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-semibold mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            7/24 Müşteri Desteği
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Bize{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg,#D4AF37,#F5E6A3,#c4a030)" }}
            >
              Ulaşın
            </span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Kutsal yolculuğunuzla ilgili tüm sorularınız için uzman ekibimiz yanınızda.
            Rezervasyon, vize veya program detayları için hemen iletişime geçin.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative z-10 -mt-10 container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card) => {
            const Icon = card.icon
            return (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group block ${card.bg} border ${card.border} rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest ${card.text} mb-1`}>
                  {card.label}
                </div>
                <div className="font-bold text-slate-800 text-sm leading-snug break-all mb-1">
                  {card.value}
                </div>
                <div className="text-xs text-slate-500">{card.sub}</div>
              </a>
            )
          })}
        </div>
      </section>

      {/* Map + Info */}
      <section className="container mx-auto px-4 md:px-8 max-w-6xl py-20">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 min-h-[400px]">
            <iframe
              title="Artur Turizm Harita"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d35.4855!3d38.7225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQzJzIxLjAiTiAzNcKwMjknMDcuOCJF!5e0!3m2!1str!2str!4v1691000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              className="min-h-[400px] border-0 grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-2xl gradient-gold flex items-center justify-center shadow-md">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Çalışma Saatleri</h3>
              </div>
              <ul className="space-y-3">
                {workingHours.map((item) => (
                  <li
                    key={item.day}
                    className="flex items-center justify-between text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-slate-600 font-medium">{item.day}</span>
                    <span className={`font-bold ${item.hours === "Kapalı" ? "text-rose-500" : "text-slate-800"}`}>
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700 font-semibold text-center">
                Telefon hattımız 7/24 açıktır
              </div>
            </div>

            <a
              href="https://wa.me/905324493823"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl shadow-emerald-500/25 hover:-translate-y-1 hover:shadow-emerald-500/40 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">WhatsApp ile Ulaşın</div>
                <div className="text-emerald-100 text-sm mt-0.5">Hızlı ve kolay iletişim</div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/60 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="bg-slate-950 rounded-3xl p-7 text-white">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="font-bold text-sm uppercase tracking-widest text-primary">Ofisimiz</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Hunat Mahallesi, Nuh Naci Yazgan Caddesi,<br />
                Neşe Apartmanı<br />
                <span className="text-slate-400 text-xs">(Eski Verem Hastanesi Karşısı)</span><br />
                <span className="text-white font-semibold">Kayseri / Türkiye</span>
              </p>
              <a
                href="https://maps.google.com/?q=Hunat+Mahallesi+Nuh+Naci+Yazgan+Kayseri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-primary hover:text-amber-400 transition-colors"
              >
                Haritada Görüntüle <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 border-t border-slate-100 py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Sık Sorulan{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#D4AF37,#c4a030)" }}
              >
                Sorular
              </span>
            </h2>
            <p className="text-slate-500">Merak ettiğiniz konular burada yanıt bulabilir</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <h4 className="font-bold text-slate-800 mb-2 leading-snug">{faq.q}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
