"use server"

import { prisma } from "@/lib/db"
import { Resend } from "resend"
import crypto from "crypto"
import { headers } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function createAppointment({ payment_method, ...data }: {
  full_name: string
  phone: string
  email: string
  tour_id: string
  pax: number
  room_type?: string
  room_count?: number
  total_price?: number
  passengers?: any[]
  payment_method?: "card" | "transfer"
}) {
  try {
    const appointment = await prisma.appointment.create({
      data: {
        ...data,
        status: payment_method === "card" ? "pending_payment" : "pending", 
        passengers: data.passengers || undefined,
      },
      include: { tour: true }
    })

    // Kontenjanı düşür (her iki ödeme yönteminde de, 0'ın altına düşmez)
    if (data.pax > 0) {
      await prisma.tour.update({
        where: { id: data.tour_id },
        data: {
          capacity: {
            decrement: data.pax,
          },
        },
      })
      // Sıfırın altına düşmesini engelle (negatif olursa 0'a sabitle)
      await prisma.tour.updateMany({
        where: { id: data.tour_id, capacity: { lt: 0 } },
        data: { capacity: 0 },
      })
    }

    // Ödeme yöntemine göre yönlendirme URL'si belirle
    let checkoutUrl: string | undefined = undefined

    if (payment_method === "card" && data.total_price) {
      const totalWithFee = data.total_price;
      
      const clientId = process.env.ALBARAKA_CLIENT_ID || "";
      const storeKey = process.env.ALBARAKA_STORE_KEY || "";
      const amount = totalWithFee.toFixed(2);
      const oid = appointment.id;
      const okUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payment/albaraka/callback?status=success`;
      const failUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payment/albaraka/callback?status=fail`;
      
      const rnd = new Date().getTime().toString();
      const hashString = clientId + oid + amount + okUrl + failUrl + rnd + storeKey;
      
      // Standart EST (NestPay) Hash (SHA-1 veya SHA-512 bankanın dökümanına göre değişebilir)
      const hash = crypto.createHash('sha1').update(hashString).digest('base64');

      // Ödeme sayfasına yönlendir, bu sayfa gizli formu Albaraka'ya post edecek.
      checkoutUrl = `/tours/payment/albaraka?oid=${oid}&amount=${amount}&rnd=${rnd}&hash=${encodeURIComponent(hash)}`;
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY && payment_method !== "card") {
      try {
        const adminEmail = process.env.ADMIN_EMAIL || "selamicoskunarturturizm@gmail.com"
        
        // Müşteriye bildirim
        if (data.email && data.email !== "Belirtilmedi") {
          await resend.emails.send({
            from: "Artur Turizm <onboarding@resend.dev>",
            to: data.email,
            subject: "Başvurunuz Alındı - Artur Turizm",
            html: `<p>Sayın ${data.full_name},</p>
                   <p><strong>${appointment.tour.title}</strong> turumuz için başvurunuz başarıyla alınmıştır.</p>
                   <p>Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>`,
          })
        }

        // Admin'e bildirim
        await resend.emails.send({
          from: "Artur Sistem <onboarding@resend.dev>",
          to: adminEmail,
          subject: "Yeni Başvuru Geldi - Artur Turizm",
          html: `<h3>Sisteme yeni bir başvuru/randevu talebi geldi.</h3>
                 <ul>
                  <li><strong>Müşteri:</strong> ${data.full_name}</li>
                  <li><strong>Telefon:</strong> ${data.phone}</li>
                  <li><strong>E-posta:</strong> ${data.email}</li>
                  <li><strong>Tur:</strong> ${appointment.tour.title}</li>
                  <li><strong>Kişi Sayısı:</strong> ${data.pax}</li>
                  <li><strong>Oda Tipi:</strong> ${data.room_count} x ${data.room_type}</li>
                 </ul>`,
        })
      } catch (emailError) {
        console.error("Email gönderim hatası:", emailError)
        // E-posta gitmese bile rezervasyon iptal olmasın
      }
    }

    return { success: true, appointment, checkoutUrl }
  } catch (error: any) {
    console.error("Error creating appointment:", error)
    return { success: false, error: error?.message || "Rezervasyon oluşturulamadı." }
  }
}
