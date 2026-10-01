"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true)

  const phoneNumber = "905324493823"
  const message = encodeURIComponent("Merhaba, umre/hac turları hakkında bilgi almak istiyorum.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip/bubble */}
      {tooltip && (
        <div className="relative bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] px-5 py-4 w-[250px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button
            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            onClick={() => setTooltip(false)}
            aria-label="Kapat"
          >
            <X className="h-3.5 w-3.5 text-slate-500" />
          </button>
          <div className="text-sm font-bold text-slate-800 leading-tight pr-6">
            7/24 WhatsApp'tan ulaşın! <span className="inline-block translate-y-0.5">💭</span>
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1.5">
            Hemen cevap veriyoruz
          </div>
          {/* Arrow pointing down-right */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white rotate-45 shadow-[4px_4px_10px_-5px_rgba(0,0,0,0.1)]" />
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#20b858] flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
        aria-label="WhatsApp ile iletişime geç"
        onClick={() => setTooltip(false)}
      >
        <svg viewBox="0 0 24 24" className="h-9 w-9 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  )
}
