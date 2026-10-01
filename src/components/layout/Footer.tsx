import Link from "next/link"
import { ShieldCheck, Phone, Mail, MapPin, ArrowRight } from "lucide-react"

const quickLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Umre Paketleri", href: "/#tours" },
  { label: "Hac Programları", href: "/hac-programlari" },
  { label: "Otellerimiz", href: "/oteller" },
  { label: "İletişim", href: "/iletisim" },
]

const serviceLinks = [
  { label: "Umre Nedir?", href: "/umre-nedir" },
  { label: "Hac Nedir?", href: "/hac-nedir" },
  { label: "Ramazan Umresi", href: "/ramazan-umresi" },
  { label: "Ziyaret Yerleri", href: "/ziyaret-yerleri" },
  { label: "Hac Hazırlık", href: "/hac-hazirlik" },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Background Ornament */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-primary/3 blur-3xl" />
        {/* Islamic geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6 group">
              <img 
                src="/logo.jpg" 
                alt="Artur Turizm Logo" 
                className="h-24 w-24 rounded-full object-cover shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Yılların birikimi ve tecrübesiyle kutsal topraklara yolculuğunuzda güvenilir ve sorumlu yol arkadaşınız.
            </p>

            {/* Trust Badges */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 bg-emerald-900/30 border border-emerald-800/40 px-3 py-2.5 rounded-xl w-fit">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-300">TÜRSAB Onaylı Acente</span>
              </div>
              <div className="flex items-center gap-2.5 bg-primary/10 border border-primary/20 px-3 py-2.5 rounded-xl w-fit">
                <div className="h-4 w-4 rounded-full gradient-gold flex items-center justify-center shrink-0">
                  <span className="text-[8px] font-bold text-white">★</span>
                </div>
                <span className="text-xs font-semibold text-primary">Diyanet Yetkili Acente</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://wa.me/905324493823"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-emerald-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 flex items-center gap-2">
              <span className="h-1 w-5 gradient-gold rounded-full inline-block" />
              Hızlı Erişim
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors duration-200 group/link"
                  >
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all duration-200 text-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-5 flex items-center gap-2">
              <span className="h-1 w-5 gradient-gold rounded-full inline-block" />
              Hizmetlerimiz
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors duration-200 group/link"
                  >
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all duration-200 text-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 flex items-center gap-2">
              <span className="h-1 w-5 gradient-gold rounded-full inline-block" />
              İletişim
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+905324493823" className="flex items-start gap-3 text-sm text-slate-400 hover:text-primary transition-colors group/c">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 group-hover/c:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">7/24 Destek Hattı</div>
                    <div className="font-semibold text-slate-200">+90 532 449 38 23</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:selamicoskunarturturizm@gmail.com" className="flex items-start gap-3 text-sm text-slate-400 hover:text-primary transition-colors group/c">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 group-hover/c:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">E-Posta</div>
                    <div className="font-semibold text-slate-200 text-xs break-all">selamicoskunarturturizm@gmail.com</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Adres</div>
                    <div className="font-medium text-slate-300 text-xs leading-relaxed">
                      Hunat Mah. Nuh Naci Yazgan Cad.<br />
                      Neşe Apt. (Eski Verem Hast. Karşısı)
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Artur Hac ve Umre Turizm. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <Link href="/gizlilik" className="hover:text-slate-300 transition-colors">Gizlilik Politikası</Link>
            <Link href="/kvkk" className="hover:text-slate-300 transition-colors">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
