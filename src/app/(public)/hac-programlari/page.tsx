import { Map } from "lucide-react";

export default function HacProgramlariPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Günlük Hac <span className="text-primary">Programları</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Mekke ve Medine'deki manevi yolculuğunuzun her anını dolu dolu yaşamanız için özenle hazırlanan günlük planlarımız.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="h-14 w-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
              <Map className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Örnek Hac Programı İşleyişi</h2>
              <p className="text-slate-500">Adım adım kutsal görevler</p>
            </div>
          </div>
          
          <div className="space-y-8">
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                <div className="h-full w-0.5 bg-slate-200 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-slate-800">Mekke'ye Varış ve Umre</h3>
                <p className="text-slate-600 mt-2">İhrama girilerek Mekke'ye varılır. Kâbe'de umre tavafı ve Safa-Merve arasında sa'y yapılarak umre tamamlanır. Hac günlerine kadar ihramsız olarak ibadetlere devam edilir.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                <div className="h-full w-0.5 bg-slate-200 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-slate-800">Terviye Günü (8 Zilhicce)</h3>
                <p className="text-slate-600 mt-2">Mekke'de tekrar ihrama girilir ve Mina'ya hareket edilir. Gece Mina'da geçirilir ve ibadetle meşgul olunur.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                <div className="h-full w-0.5 bg-slate-200 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-slate-800">Arafat Vakfesi (9 Zilhicce)</h3>
                <p className="text-slate-600 mt-2">Sabah Arafat'a geçilir. Haccın en büyük rüknü olan Arafat vakfesi yapılır. Dualar eşliğinde gün geçirilir ve güneşin batmasıyla birlikte Müzdelife'ye hareket edilir.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                <div className="h-full w-0.5 bg-slate-200 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-slate-800">Müzdelife ve Mina (Bayramın 1. Günü)</h3>
                <p className="text-slate-600 mt-2">Müzdelife vakfesi sonrası Mina'da Akabe Cemresi'ne taş atılır. Kurban kesilir, tıraş olunup ihramdan çıkılır. Ardından Ziyaret Tavafı yapılır.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">5</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Medine Ziyareti</h3>
                <p className="text-slate-600 mt-2">Mekke'deki hac ibadetlerinin ardından veya öncesinde, Peygamber Efendimiz (s.a.v)'in şehri Medine-i Münevvere'ye geçilir. Mescid-i Nebevi, Ravza-i Mutahhara ve diğer kutsal mekanlar ziyaret edilir.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
