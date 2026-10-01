import { Star } from "lucide-react";

export default function RamazanUmresiPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Ramazan-ı Şerif <span className="text-primary">Umresi</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Mübarek Ramazan ayında Haremeyn'in eşsiz manevi iklimini yaşamak isteyenler için özel programlarımız.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
            <div className="h-14 w-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
              <Star className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">"Benimle Hac Yapmış Gibidir"</h2>
              <p className="text-slate-500">Müjdelenen kutlu ibadet</p>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none text-slate-600">
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
              <p className="text-emerald-800 font-medium italic text-xl text-center m-0">
                "Ramazan ayında yapılan umre, benimle birlikte yapılan hacca denktir."
              </p>
              <p className="text-emerald-600 text-center text-sm mt-2 font-bold">- Hadis-i Şerif (Buhârî, Umre, 4)</p>
            </div>

            <p>
              Ramazan ayı, on bir ayın sultanı ve Kuran ayıdır. Bu mübarek ayda Mekke ve Medine'de bulunmak, oruçları Kâbe'ye bakarak açmak ve teravih namazlarını Mescid-i Haram veya Mescid-i Nebevi'de yüz binlerce Müslümanla birlikte eda etmek, tarif edilemez bir huzur kaynağıdır.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Neden Ramazan Umresi?</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Muazzam Sevap:</strong> Ramazan ayında yapılan ibadetlerin sevabı diğer aylara göre kat kat fazladır.</li>
              <li><strong>Haremeyn'de İftar:</strong> Kâbe'nin gölgesinde veya Ravza'nın manevi atmosferinde hurma ve zemzemle iftar yapmanın hazzı eşsizdir.</li>
              <li><strong>Hatimle Teravih:</strong> Haremeyn imamlarının o muhteşem kıraatleriyle hatimle kıldırılan teravih namazları kalpleri titretir.</li>
              <li><strong>Kadir Gecesi:</strong> Bin aydan daha hayırlı olan Kadir Gecesi'ni Kâbe'de ihya etmek, her müminin en büyük hayallerinden biridir.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
