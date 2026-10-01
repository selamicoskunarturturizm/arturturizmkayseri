import { Moon } from "lucide-react";

export default function UmreNedirPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Umre <span className="text-primary">Nedir?</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Yılın her dönemi yapılabilen, manevi yenilenme ve arınma vesilesi olan kutlu ziyaret.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="h-14 w-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
              <Moon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Sünnet Olan İbadet</h2>
              <p className="text-slate-500">Kâbe'ye yöneliş</p>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none text-slate-600">
            <p>
              <strong>Umre</strong>, sözlükte "ziyaret etmek" anlamına gelir. İslami bir terim olarak ise; hac mevsimi (Zilhicce ayı) dışında, yılın herhangi bir zamanında ihrama girerek Kâbe'yi tavaf etmek ve Safa ile Merve arasında sa'y yaptıktan sonra tıraş olup ihramdan çıkarak yapılan ibadettir.
            </p>
            <p>
              Hac farz, umre ise Hanefi mezhebine göre müekked bir sünnet, Şafii ve Hanbeli mezheplerine göre ise farzdır. Hac ibadetinde bulunan Arafat vakfesi, Müzdelife, Mina ve şeytan taşlama gibi rükünler umrede bulunmaz, bu nedenle daha kısa sürer.
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Umrenin Faziletleri</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Günahlara Keffaret:</strong> Peygamber Efendimiz (s.a.v), "Umre, diğer bir umre ile arasındaki günahlara kefarettir" buyurmuştur.</li>
              <li><strong>Manevi Yenilenme:</strong> Dünya telaşından uzaklaşıp Allah'ın evini ziyaret etmek, kalbi ferahlatır ve imanı tazeler.</li>
              <li><strong>Duaların Kabulü:</strong> Kâbe'de ve Mescid-i Nebevi'de yapılan dualar, Allah'ın izniyle geri çevrilmez.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
