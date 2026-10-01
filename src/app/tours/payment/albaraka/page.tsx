import { redirect } from "next/navigation"

export default async function AlbarakaPaymentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { oid, amount, rnd, hash } = await searchParams

  if (!oid || !amount || !rnd || !hash) {
    redirect("/")
  }

  const clientId = process.env.ALBARAKA_CLIENT_ID || ""
  const okUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payment/albaraka/callback?status=success`
  const failUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payment/albaraka/callback?status=fail`
  
  // EST / NestPay endpoint for Albaraka
  const gatewayUrl = process.env.ALBARAKA_GATEWAY_URL || "https://sanalpos.albarakaturk.com.tr/fim/est3Dgate"

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Güvenli Ödeme Sayfası</h2>
        <p className="text-slate-500 mb-6">
          Albaraka Türk Katılım Bankası 3D Secure ödeme sayfasına yönlendiriliyorsunuz. Lütfen bekleyin...
        </p>

        {/* Auto-submitting hidden form */}
        <form id="albaraka-form" method="post" action={gatewayUrl}>
          <input type="hidden" name="clientid" value={clientId} />
          <input type="hidden" name="storetype" value="3d" />
          <input type="hidden" name="hash" value={hash as string} />
          <input type="hidden" name="islemtipi" value="Auth" />
          <input type="hidden" name="amount" value={amount as string} />
          <input type="hidden" name="currency" value="840" /> {/* 840 = USD */}
          <input type="hidden" name="oid" value={oid as string} />
          <input type="hidden" name="okUrl" value={okUrl} />
          <input type="hidden" name="failUrl" value={failUrl} />
          <input type="hidden" name="rnd" value={rnd as string} />
          <input type="hidden" name="lang" value="tr" />
        </form>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                document.getElementById('albaraka-form').submit();
              });
            `,
          }}
        />
      </div>
    </div>
  )
}
