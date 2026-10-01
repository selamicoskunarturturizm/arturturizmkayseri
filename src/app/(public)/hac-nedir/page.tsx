import { BookOpen } from "lucide-react";

export default function HacNedirPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Hac <span className="text-primary">Nedir?</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          İslam'ın beş şartından biri olan Hac ibadeti, müminlerin en kutlu yolculuğudur.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="h-14 w-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Kutsal Yolculuk</h2>
              <p className="text-slate-500">Maddi ve manevi arınma</p>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none text-slate-600">
            <p>
              <strong>Hac</strong>, sözlükte "kastetmek, yönelmek, önemli bir yeri ziyaret etmek" anlamlarına gelir. İslami bir terim olarak ise; şartlarına haiz olan Müslümanların, belirli bir zamanda (Zilhicce ayı), belirli mekânları (Kâbe, Arafat, Müzdelife ve Mina) belirli kurallar dâhilinde ziyaret ederek yaptıkları farz ibadettir.
            </p>
            <p>
              Allah (c.c.) Kur'an-ı Kerim'de, "Ona bir yol bulabilenlerin (gücü yetenlerin) Beyti hac etmesi, Allah’ın insanlar üzerindeki hakkıdır." (Âl-i İmrân, 3/97) buyurarak hac ibadetinin farz olduğunu açıkça belirtmiştir.
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Haccın Faydaları ve Hikmetleri</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Eşitlik ve Kardeşlik:</strong> İhramla birlikte dünyevi tüm makam ve mevkiler geride kalır, herkes Allah'ın huzurunda eşittir.</li>
              <li><strong>Günahlardan Arınma:</strong> Peygamber Efendimiz (s.a.v), "Kim Allah için hacceder, kötü söz ve davranışlardan sakınırsa, annesinden doğduğu günkü gibi günahlarından arınmış olarak döner" buyurmuştur.</li>
              <li><strong>Sabır ve Nefis Terbiyesi:</strong> Hac meşakkatli bir ibadettir. İnsana sabretmeyi, zorluklara tahammül etmeyi ve nefsine hakim olmayı öğretir.</li>
              <li><strong>Mahşerin Provası:</strong> Arafat'ta milyonlarca insanın beyaz ihramlar içinde ellerini açıp dua etmesi, mahşer gününü hatırlatır.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
