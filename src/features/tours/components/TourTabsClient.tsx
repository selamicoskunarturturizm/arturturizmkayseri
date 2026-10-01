"use client"

import { useState } from "react"
import { Plane, Bus, Hotel, MapPin, Phone, FileText } from "lucide-react"

interface TourTabsProps {
  flights: any[] | null
  hotels: any[] | null
  tourProgram: string | null
  airportContact: string | null
  meccaLocation: string | null
  medinaLocation: string | null
}

const tabs = [
  { key: "genel",      label: "Ucus & Otel",       icon: Plane },
  { key: "program",    label: "Tur Programi",       icon: FileText },
  { key: "havalimani", label: "Havalimani Irtibat", icon: Phone },
  { key: "mekke",      label: "Mekke Otel",         icon: Hotel },
  { key: "medine",     label: "Medine Otel",        icon: MapPin },
]

export function TourTabsClient({ flights, hotels, tourProgram, airportContact, meccaLocation, medinaLocation }: TourTabsProps) {
  const [activeTab, setActiveTab] = useState("genel")

  const renderLocation = (locationHTML: string | null) => {
    if (!locationHTML || locationHTML.trim() === "") {
      return <div className="text-slate-500 py-16 text-center text-sm">Konum bilgisi eklenmemis.</div>
    }
    if (locationHTML.includes("<iframe")) {
      return (
        <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 aspect-video" dangerouslySetInnerHTML={{ __html: locationHTML }} />
      )
    }
    const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(locationHTML)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    return (
      <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 aspect-video">
        <iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src={embedUrl} className="grayscale hover:grayscale-0 transition-all duration-500" />
      </div>
    )
  }

  return (
    <div className="mb-10">
      {/* Tab Header */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

        {/* TAB 1: Genel - Flights + Hotels */}
        {activeTab === "genel" && (
          <div className="space-y-10">
            {/* Flights */}
            {flights && Array.isArray(flights) && flights.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Plane className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Ucus Detaylari</h3>
                </div>
                <div className="space-y-4">
                  {flights.map((flight: any, idx: number) => {
                    const cities = flight.parkur ? flight.parkur.split("-") : ["Bilinmiyor", "Bilinmiyor"]
                    const isTransfer = flight.direction?.toLowerCase().includes("transfer")
                    return (
                      <div key={idx} className={`rounded-2xl border overflow-hidden flex flex-col md:flex-row ${isTransfer ? "border-amber-200 bg-amber-50/30" : "border-slate-200 bg-slate-50/30"}`}>
                        {/* Direction badge */}
                        <div className={`flex flex-col items-center justify-center px-6 py-5 md:w-44 text-white ${isTransfer ? "bg-gradient-to-br from-amber-500 to-amber-700" : "bg-gradient-to-br from-slate-700 to-slate-900"}`}>
                          {isTransfer ? <Bus className="h-7 w-7 mb-2 opacity-90" /> : <Plane className="h-7 w-7 mb-2 opacity-90" />}
                          <span className="font-bold text-sm uppercase tracking-wide text-center leading-tight">{flight.direction}</span>
                          <span className="text-xs mt-1.5 opacity-80 font-medium">{flight.date}</span>
                        </div>
                        {/* Flight route */}
                        <div className="flex-1 flex items-center justify-between p-6">
                          <div className="text-center w-24">
                            <div className="text-3xl font-black text-slate-900">{flight.departureTime || "--:--"}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">{cities[0]}</div>
                          </div>
                          <div className="flex-1 px-6 flex flex-col items-center">
                            <div className={`text-xs font-bold px-3 py-1 rounded-full mb-2 ${isTransfer ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                              {isTransfer ? "KARAYOLU" : `NO: ${flight.flightNumber || "-"}`}
                            </div>
                            <div className="w-full relative flex items-center justify-center">
                              <div className="h-px w-full bg-slate-200 absolute" />
                              {isTransfer
                                ? <Bus className="h-5 w-5 text-amber-500 bg-white px-0.5 relative z-10" />
                                : <Plane className="h-5 w-5 text-primary bg-white px-0.5 relative z-10 rotate-90" />}
                            </div>
                            <div className={`text-[10px] font-bold mt-2 ${isTransfer ? "text-amber-600" : "text-primary"}`}>
                              {isTransfer ? "VIP Transfer" : "Direkt Ucus"}
                            </div>
                          </div>
                          <div className="text-center w-24">
                            <div className="text-3xl font-black text-slate-900">{flight.arrivalTime || "--:--"}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">{cities[1] || cities[0]}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Hotels */}
            {hotels && Array.isArray(hotels) && hotels.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Hotel className="h-5 w-5 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Konaklama Otelleri</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {hotels.map((hotel: any, idx: number) => (
                    <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                      {hotel.image && (
                        <div className="h-36 overflow-hidden bg-slate-100">
                          <img src={hotel.image} className="w-full h-full object-cover" alt={hotel.name} />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{hotel.type} Oteli</div>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">{hotel.name}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Konaklama</span>
                            <span className="font-bold text-slate-800">{hotel.nights} Gece</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Mesafe</span>
                            <span className="font-bold text-slate-800">{hotel.distance} mt.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!flights || flights.length === 0) && (!hotels || hotels.length === 0) && (
              <div className="text-slate-400 text-center py-16">Henuz ucus ve otel bilgisi eklenmemis.</div>
            )}
          </div>
        )}

        {/* TAB 2: Tur Programi */}
        {activeTab === "program" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-blue-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Tur Programi</h3>
            </div>
            {tourProgram ? (
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 leading-relaxed">{tourProgram}</div>
            ) : (
              <p className="text-slate-400 text-center py-16">Tur programi detayi eklenmemis.</p>
            )}
          </div>
        )}

        {/* TAB 3: Havalimani */}
        {activeTab === "havalimani" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-rose-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-rose-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Havalimani Irtibat Bilgileri</h3>
            </div>
            {airportContact ? (
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 leading-relaxed">{airportContact}</div>
            ) : (
              <p className="text-slate-400 text-center py-16">Irtibat bilgisi eklenmemis.</p>
            )}
          </div>
        )}

        {/* TAB 4: Mekke */}
        {activeTab === "mekke" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mekke Otel Konumu</h3>
            </div>
            {renderLocation(meccaLocation)}
          </div>
        )}

        {/* TAB 5: Medine */}
        {activeTab === "medine" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Medine Otel Konumu</h3>
            </div>
            {renderLocation(medinaLocation)}
          </div>
        )}

      </div>
    </div>
  )
}