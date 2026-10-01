import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Ödeme Başarılı!</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Tur rezervasyonunuz ve ödemeniz başarıyla alınmıştır. İlgili detaylar ve biletiniz e-posta adresinize gönderildi. Kutsal topraklara yapacağınız bu güzel yolculukta bizi tercih ettiğiniz için teşekkür ederiz.
        </p>
        
        <Button asChild className="w-full h-12 text-base rounded-xl bg-emerald-700 hover:bg-emerald-800">
          <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
      </div>
    </div>
  )
}
