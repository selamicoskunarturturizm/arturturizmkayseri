"use client"

import { useEffect, useRef, useState } from "react"

interface StatItem {
  value: number
  suffix: string
  label: string
  prefix?: string
}

const stats: StatItem[] = [
  { value: 15, suffix: "+", label: "Yıllık Tecrübe" },
  { value: 10000, suffix: "+", label: "Mutlu Hacı & Umreci" },
  { value: 30, suffix: "+", label: "Kalkış Noktası" },
  { value: 98, suffix: "%", label: "Müşteri Memnuniyeti" },
]

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])

  return count
}

function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.value, 2200, active)

  return (
    <div className="flex flex-col items-center text-center group">
      <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
        {stat.prefix && <span className="text-primary">{stat.prefix}</span>}
        {count.toLocaleString("tr-TR")}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <div className="text-slate-400 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
      <div className="h-0.5 w-0 group-hover:w-12 bg-primary transition-all duration-500 rounded-full mt-3" />
    </div>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dark background with pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Top/bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
