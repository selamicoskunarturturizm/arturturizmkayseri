import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get("status") // "success" or "fail"
    
    // EST (NestPay) POST verilerini alır
    const formData = await req.formData()
    const mdStatus = formData.get("mdStatus") as string // 1, 2, 3, 4 = 3D başarılı
    const oid = formData.get("oid") as string // Appointment ID
    const errmsg = formData.get("ErrMsg") as string
    const responseCode = formData.get("Response") as string // "Approved" veya "Declined"

    // Örnek EST güvenlik doğrulaması buraya eklenebilir (HASH kontrolü)
    // Şimdilik sadece basit bir kontrol yapıyoruz.

    if (status === "success" && responseCode === "Approved" && ["1", "2", "3", "4"].includes(mdStatus)) {
      // Ödeme başarılı, rezervasyonu onayla
      await prisma.appointment.update({
        where: { id: oid },
        data: { status: "confirmed" } // veya 'contacted' vs.
      })

      // Başarı sayfasına yönlendir
      return NextResponse.redirect(new URL("/tours/success", req.url))
    } else {
      // Ödeme başarısız, status'u güncelle
      if (oid) {
        await prisma.appointment.update({
          where: { id: oid },
          data: { status: "payment_failed" }
        })
      }

      // Hata sayfasına yönlendir (mesajla birlikte)
      return NextResponse.redirect(new URL(`/tours/error?msg=${encodeURIComponent(errmsg || "Ödeme işlemi başarısız oldu.")}`, req.url))
    }

  } catch (error) {
    console.error("Albaraka callback error:", error)
    return NextResponse.redirect(new URL("/tours/error", req.url))
  }
}
