"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Vize işlemleri ne kadar sürüyor ve neler gerekli?",
    answer:
      "Umre vizesi işlemleri evraklarınız (en az 6 ay geçerli pasaport) bize ulaştıktan sonra ortalama 2-4 iş günü içerisinde sonuçlanmaktadır. Tüm vize süreci profesyonel ekibimiz tarafından sizin adınıza takip edilmektedir.",
  },
  {
    question: "Oteliniz Mescid-i Haram ve Mescid-i Nebevi'ye ne kadar mesafede?",
    answer:
      "Paketlerimize göre değişiklik göstermektedir. Ekonomik paketlerimizde ring servisli oteller sunarken, Altın ve Platin paketlerimizde doğrudan Harem avlusuna sıfır veya kısa yürüme mesafesinde olan premium oteller (Hilton, Swissotel vb.) tercih edilmektedir.",
  },
  {
    question: "Tur ücretine hangi hizmetler dahildir?",
    answer:
      "Uçak biletleri, Umre vizesi, belirtilen gün sayısı kadar konaklama, sabah kahvaltısı ve akşam yemeği (Türk damak tadına uygun), Mekke-Medine arası transferler, lüks araçlarla havaalanı transferleri ve tecrübeli hocalarımız eşliğinde tüm rehberlik hizmetleri ücrete dahildir.",
  },
  {
    question: "Uçuşlarınız hangi havayolları ile gerçekleşmektedir?",
    answer:
      "Ağırlıklı olarak Türk Hava Yolları (THY) ve Suudi Arabistan Havayolları (Saudia) ile doğrudan (aktarmasız) uçuşlar gerçekleştirmekteyiz. Bulunduğunuz şehre göre bağlantılı uçuşlar da organize edilebilmektedir.",
  },
  {
    question: "Turlarınızda kadınlar için mahrem şartı var mıdır?",
    answer:
      "Suudi Arabistan'ın güncel vize kuralları gereğince, her yaştan kadın misafirimiz tek başına veya arkadaş grubuyla mahremi (yanında erkek akrabası) olmadan Umre vizesi alabilmekte ve turlarımıza rahatlıkla katılabilmektedir.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-slate-50 relative z-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
            Merak Edilenler
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Sıkça Sorulan Sorular
          </h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-slate-500">
            Kutsal topraklara yapacağınız yolculuk öncesinde aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={cn(
                  "bg-white border rounded-2xl overflow-hidden transition-all duration-300",
                  isOpen
                    ? "border-primary/30 shadow-lg shadow-primary/5"
                    : "border-slate-200 hover:border-slate-300 shadow-sm"
                )}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                >
                  <span
                    className={cn(
                      "font-semibold text-lg transition-colors duration-300",
                      isOpen ? "text-primary" : "text-slate-800"
                    )}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "flex-shrink-0 ml-4 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300",
                      isOpen ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        isOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
