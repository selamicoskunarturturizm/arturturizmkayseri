import { Luggage } from "lucide-react";

export default function HacHazirlikPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Hac İçin <span className="text-primary">Hazırlıklar</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Maddi ve manevi boyutuyla büyük bir ibadet olan Hac yolculuğuna çıkmadan önce yapılması gereken hazırlıklar.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="h-14 w-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
              <Luggage className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Yolculuk Öncesi</h2>
              <p className="text-slate-500">Maddi ve manevi adımlar</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Manevi Hazırlıklar</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Niyeti halis tutmak, sadece Allah rızası için yola çıkmak.</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Kul haklarıyla helalleşmek ve varsa borçları ödemek.</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Samimi bir tövbe (Tövbe-i Nasuh) ile günahlardan arınmayı dilemek.</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Hac menasikini (kurallarını ve dualarını) öğrenmek. Seminerlere katılmak.</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Sabırlı, hoşgörülü ve yardımlaşmaya açık bir ruh haline bürünmek.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Maddi Hazırlıklar (Valiz)</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> İhram kıyafeti (erkekler için) ve uygun, rahat elbiseler (kadınlar için).</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Kokusuz sabun, şampuan ve ıslak mendil (ihramlıyken kullanmak için).</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Rahat bir yürüyüş ayakkabısı veya ortopedik terlik.</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Sürekli kullanılan reçeteli ilaçlar ve küçük bir ilk yardım çantası.</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Hafif bir sırt çantası (Müzdelife ve Arafat'ta ihtiyaç olacak eşyalar için).</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
