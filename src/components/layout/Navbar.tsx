"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneCall, ChevronDown, Menu, X, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
]

const hacLinks = [
  { label: "Hac Nedir?", href: "/hac-nedir", desc: "Haccın anlamı ve önemi" },
  { label: "Günlük Programlar", href: "/hac-programlari", desc: "Detaylı hac programı" },
  { label: "Hac İçin Hazırlıklar", href: "/hac-hazirlik", desc: "Bilinmesi gerekenler" },
]

const umreLinks = [
  { label: "Umre Nedir?", href: "/umre-nedir", desc: "Umrenin fazileti" },
  { label: "Umre Paketleri", href: "/#tours", desc: "Ekonomik, Altın, Platin" },
  { label: "Ramazan Umresi", href: "/ramazan-umresi", desc: "Mübarek Ramazan'da umre" },
  { label: "Ziyaret Yerleri", href: "/ziyaret-yerleri", desc: "Kutsal mekânlar rehberi" },
]

function DropdownMenu({ links }: { links: typeof hacLinks }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-2xl w-64 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50">
      {/* Arrow */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-slate-100 rotate-45" />
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex flex-col px-5 py-3 hover:bg-primary/5 group/item transition-colors"
        >
          <span className="font-semibold text-slate-800 group-hover/item:text-primary transition-colors text-sm">
            {link.label}
          </span>
          {link.desc && (
            <span className="text-xs text-slate-400 mt-0.5">{link.desc}</span>
          )}
        </Link>
      ))}
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileHac, setMobileHac] = useState(false)
  const [mobileUmre, setMobileUmre] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100"
            : "bg-white/80 backdrop-blur-md border-b border-slate-200/50"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <Link href="/" className="flex items-center group" onClick={() => setMobileOpen(false)}>
            <img 
              src="/logo.jpg" 
              alt="Artur Turizm Logo" 
              className="h-20 w-20 rounded-full object-cover shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
            <Link href="/" className="px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-primary transition-all duration-200">
              Ana Sayfa
            </Link>
            <Link href="/hakkimizda" className="px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-primary transition-all duration-200">
              Hakkımızda
            </Link>

            <div className="relative group flex items-center cursor-pointer py-2">
              <div className="flex items-center gap-1 px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-primary transition-all duration-200">
                Hac
                <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <DropdownMenu links={hacLinks} />
            </div>

            <div className="relative group flex items-center cursor-pointer py-2">
              <div className="flex items-center gap-1 px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-primary transition-all duration-200">
                Umre
                <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <DropdownMenu links={umreLinks} />
            </div>

            <Link href="/oteller" className="px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-primary transition-all duration-200 text-primary font-bold">
              Otellerimiz
            </Link>
            <Link href="/galeri" className="px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-primary transition-all duration-200">
              Galeri
            </Link>
            <Link href="/iletisim" className="px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-primary transition-all duration-200">
              İletişim
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+905324493823"
              className="hidden xl:flex items-center gap-2.5 px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-primary transition-all duration-200 group"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <PhoneCall className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">7/24 Destek</span>
                <span className="text-sm font-bold">+90 532 449 38 23</span>
              </div>
            </a>

            <Button
              asChild
              variant="default"
              className="hidden sm:flex rounded-xl px-5 h-10 shadow-md shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 bg-primary text-white font-bold hover:bg-primary-hover"
            >
              <Link href="/#tours">Rezervasyon</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menüyü aç/kapat"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[320px] max-w-full bg-white shadow-2xl transition-transform duration-300 overflow-y-auto pt-20",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-6 space-y-1">
            <Link href="/" className="block px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Ana Sayfa
            </Link>
            <Link href="/hakkimizda" className="block px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Hakkımızda
            </Link>

            {/* Hac dropdown mobile */}
            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-primary transition-colors"
                onClick={() => setMobileHac(!mobileHac)}
              >
                Hac
                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileHac && "rotate-180")} />
              </button>
              {mobileHac && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-4">
                  {hacLinks.map(l => (
                    <Link key={l.href} href={l.href} className="block px-3 py-2 text-sm text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-colors" onClick={() => setMobileOpen(false)}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Umre dropdown mobile */}
            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-primary transition-colors"
                onClick={() => setMobileUmre(!mobileUmre)}
              >
                Umre
                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileUmre && "rotate-180")} />
              </button>
              {mobileUmre && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-4">
                  {umreLinks.map(l => (
                    <Link key={l.href} href={l.href} className="block px-3 py-2 text-sm text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-colors" onClick={() => setMobileOpen(false)}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/oteller" className="block px-4 py-3 rounded-xl font-bold text-primary hover:bg-primary/5 transition-colors" onClick={() => setMobileOpen(false)}>
              Otellerimiz
            </Link>
            <Link href="/galeri" className="block px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Galeri
            </Link>
            <Link href="/iletisim" className="block px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              İletişim
            </Link>

            <div className="pt-4 space-y-3 border-t border-slate-100">
              <a href="tel:+905324493823" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors">
                <PhoneCall className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-slate-400">7/24 Destek</div>
                  <div className="font-bold text-sm">+90 532 449 38 23</div>
                </div>
              </a>
              <a href="https://wa.me/905324493823" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="font-bold text-sm">WhatsApp ile Ulaşın</span>
              </a>
              <Button asChild className="w-full rounded-xl bg-primary text-white font-bold hover:bg-primary-hover">
                <Link href="/#tours" onClick={() => setMobileOpen(false)}>Rezervasyon Yap</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
