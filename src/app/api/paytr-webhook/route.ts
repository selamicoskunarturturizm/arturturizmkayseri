import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import crypto from "crypto"
import { Resend } from "resend"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const merchant_oid = formData.get("merchant_oid") as string
    const status = formData.get("status") as string
    const total_amount = formData.get("total_amount") as string
    const hash = formData.get("hash") as string

    if (!merchant_oid || !hash) {
      return new NextResponse("Missing parameters", { status: 400 })
    }

    const merchant_key = process.env.PAYTR_MERCHANT_KEY || ""
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || ""

    // Validate Hash
    const hash_str = merchant_oid + merchant_salt + status + total_amount
    const computed_hash = crypto.createHmac("sha256", merchant_key).update(hash_str).digest("base64")

    if (hash !== computed_hash) {
      console.error("PayTR Webhook: Hash mismatch!", { computed_hash, hash })
      return new NextResponse("Hash mismatch", { status: 400 })
    }

    if (status === "success") {
      // Payment successful
      const updatedAppt = await prisma.appointment.update({
        where: { id: merchant_oid },
        data: { status: "paid" },
        include: { tour: true }
      })
      console.log(`Payment successful for appointment ${merchant_oid}`)

      // E-posta bildirimleri gönder (Satın Alma)
      if (process.env.RESEND_API_KEY) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY)
          const adminEmail = process.env.ADMIN_EMAIL || "selamicoskunarturturizm@gmail.com"

          // Müşteriye bildirim
          if (updatedAppt.email && updatedAppt.email !== "Belirtilmedi") {
            await resend.emails.send({
              from: "Artur Turizm <onboarding@resend.dev>",
              to: updatedAppt.email,
              subject: "Satın Alma İşlemi Başarılı - Artur Turizm",
              html: `<p>Sayın ${updatedAppt.full_name},</p>
                     <p><strong>${updatedAppt.tour?.title}</strong> turumuz için satın alma işleminiz başarıyla gerçekleşmiştir.</p>
                     <p>Bizi tercih ettiğiniz için teşekkür ederiz. Ekibimiz detaylar için sizinle iletişime geçecektir.</p>`,
            })
          }

          // Admin'e bildirim
          await resend.emails.send({
            from: "Artur Sistem <onboarding@resend.dev>",
            to: adminEmail,
            subject: "Yeni Satın Alma Gerçekleşti - Artur Turizm",
            html: `<h3>Sistem üzerinden başarılı bir satın alma işlemi gerçekleşti.</h3>
                   <ul>
                    <li><strong>Müşteri:</strong> ${updatedAppt.full_name}</li>
                    <li><strong>Telefon:</strong> ${updatedAppt.phone}</li>
                    <li><strong>E-posta:</strong> ${updatedAppt.email}</li>
                    <li><strong>Tur:</strong> ${updatedAppt.tour?.title}</li>
                    <li><strong>Kişi Sayısı:</strong> ${updatedAppt.pax}</li>
                    <li><strong>Tutar:</strong> ${(Number(total_amount) / 100).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</li>
                   </ul>`,
          })
        } catch (emailError) {
          console.error("Webhook email error:", emailError)
        }
      }
    } else {
      // Payment failed
      await prisma.appointment.update({
        where: { id: merchant_oid },
        data: { status: "payment_failed" }
      })
      console.log(`Payment failed for appointment ${merchant_oid}`)
    }

    // PayTR expects exactly "OK" string to stop retrying the webhook
    return new NextResponse("OK")
  } catch (error) {
    console.error("PayTR Webhook Error:", error)
    return new NextResponse("Server error", { status: 500 })
  }
}
