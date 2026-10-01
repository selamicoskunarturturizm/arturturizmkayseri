import { MapPin, BookOpen, Heart, Navigation, Mountain, Star } from "lucide-react"

export default function ZiyaretYerleriPage() {
  const meccaPlaces = [
    {
      title: "Mescid-i Haram ve Kâbe-i Muazzama",
      description: "Yeryüzündeki ilk mabet ve Müslümanların kıblesi. İçerisinde Hacerü'l-Esved, Makam-ı İbrahim ve Hicr-i İsmail gibi kutsal noktaları barındırır.",
      distance: "~2.5 km (Tünel üzerinden servisle 5 dakika)",
      image: "/places/kabe.jpg"
    },
    {
      title: "Safa ve Merve Tepeleri",
      description: "Hz. Hacer validemizin Hz. İsmail için su arayışının hatırası olan, Umre ve Hac sa'y ibadetinin gerçekleştirildiği mübarek tepeler.",
      distance: "~2.5 km (Mescid-i Haram'ın içerisindedir)",
      image: "/places/safa.jpg"
    },
    {
      title: "Nur Dağı ve Hira Mağarası",
      description: "Peygamber Efendimiz'e (s.a.v) ilk vahyin 'Oku' emriyle indiği, İslam'ın doğuşuna şahitlik eden kutlu dağ ve mağara.",
      distance: "~6 km (Araçla 10-15 dakika)",
      image: "/places/hira.jpg"
    },
    {
      title: "Sevr Mağarası (Sevr Dağı)",
      description: "Hicret yolculuğu sırasında Peygamberimiz (s.a.v) ve Hz. Ebubekir'in (r.a) üç gün boyunca saklandıkları ve Allah'ın onları örümcek ağıyla koruduğu dağ.",
      distance: "~8 km (Araçla 15-20 dakika)",
      image: "/places/sevr.jpg"
    },
    {
      title: "Arafat (Cebel-i Rahme)",
      description: "Haccın en önemli rüknü olan vakfenin yapıldığı yer. Aynı zamanda Hz. Âdem ile Hz. Havva'nın yeryüzünde buluştuğu Rahmet Tepesi'dir.",
      distance: "~18 km (Araçla 25-30 dakika)",
      image: "/places/arafat.jpg"
    },
    {
      title: "Müzdelife ve Mina",
      description: "Arafat'tan sonra müzdelife vakfesinin yapıldığı, Mina ise şeytan taşlama (Cemerat) ve kurban kesim ibadetlerinin gerçekleştirildiği bölgelerdir.",
      distance: "~4 km (Otelimiz Mina bölgesine ve Cemerat'a çok yakındır)",
      image: "/places/mina.jpg"
    },
    {
      title: "Cennetü'l Muallâ (Muallâ Mezarlığı)",
      description: "Mekke'nin en eski mezarlığı. Peygamber Efendimizin ilk eşi Hz. Hatice validemiz başta olmak üzere pek çok sahabenin kabri buradadır.",
      distance: "~3.5 km (Araçla 10 dakika)",
      image: "/places/mualla.jpg"
    },
    {
      title: "Cin Mescidi ve Şecere Mescidi",
      description: "Peygamber Efendimizin cinlerden bir gruba Kur'an okuduğu ve bir ağacın mucizevi şekilde yanına gelerek şahitlik ettiği mescitler bölgesi.",
      distance: "~3.5 km (Araçla 10 dakika)",
      image: "/places/cin.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-24">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Mekke-i Mükerreme <span className="text-primary">Ziyaret Yerleri</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6">
          Peygamber Efendimiz Hz. Muhammed'in (s.a.v) doğup büyüdüğü, İslam'ın yayıldığı ve her karışında ayrı bir manevi hatıra barındıran kutsal şehir Mekke'de mutlaka ziyaret edilmesi ve ibadet edilmesi gereken mübarek mekânlar.
        </p>
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
          <MapPin className="h-4 w-4" />
          Mesafeler Al Jawhara Tower Hotel (Mahbas Al Jinn) merkez alınarak hesaplanmıştır.
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meccaPlaces.map((place, idx) => (
            <div key={idx} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="h-48 w-full overflow-hidden relative">
                <img src={place.image} alt={place.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg leading-tight drop-shadow-md">
                  {place.title}
                </h3>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
                  {place.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 w-fit">
                  <Navigation className="h-3.5 w-3.5 text-primary" />
                  {place.distance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
