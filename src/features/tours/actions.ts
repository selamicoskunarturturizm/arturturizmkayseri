"use server"

import { prisma } from "@/lib/db"
import { unstable_noStore as noStore } from "next/cache"

export async function getActiveTours() {
  noStore() // always fetch fresh capacity
  try {
    const tours = await prisma.tour.findMany({
      where: { is_active: true },
      orderBy: { created_at: "desc" },
    })
    return tours
  } catch (error) {
    console.error("Error fetching active tours:", error)
    return []
  }
}

export async function getTourBySlug(slug: string) {
  noStore() // always fetch fresh capacity
  try {
    const tour = await prisma.tour.findUnique({
      where: { slug },
    })
    return tour
  } catch (error) {
    console.error(`Error fetching tour ${slug}:`, error)
    return null
  }
}

export async function createTour(data: {
  title: string
  slug: string
  description: string
  duration: number
  price: number
  image_url?: string | null
  is_active: boolean
  capacity?: number
  pricing?: any
  flights?: any[]
  hotels?: any[]
  tour_program?: string | null
  airport_contact?: string | null
  mecca_hotel_location?: string | null
  medina_hotel_location?: string | null
}) {
  try {
    const tour = await prisma.tour.create({
      data: {
        ...data,
        capacity: data.capacity !== undefined ? data.capacity : 45,
        pricing: data.pricing || undefined,
        flights: data.flights || undefined,
        hotels: data.hotels || undefined,
      }
    })
    return { success: true, tour }
  } catch (error: any) {
    console.error("Error creating tour:", error)
    if (error?.code === "P2002") {
      return { success: false, error: "Bu URL (Slug) zaten kullanılıyor. Lütfen farklı bir URL (Slug) giriniz." }
    }
    return { success: false, error: "Tur oluşturulamadı. (Hata: " + error?.message + ")" }
  }
}

export async function updateTour(id: string, data: {
  title: string
  slug: string
  description: string
  duration: number
  price: number
  image_url?: string | null
  is_active: boolean
  capacity?: number
  pricing?: any
  flights?: any[]
  hotels?: any[]
  tour_program?: string | null
  airport_contact?: string | null
  mecca_hotel_location?: string | null
  medina_hotel_location?: string | null
}) {
  try {
    const tour = await prisma.tour.update({
      where: { id },
      data: {
        ...data,
        capacity: data.capacity !== undefined ? data.capacity : 45,
        pricing: data.pricing || undefined,
        flights: data.flights || undefined,
        hotels: data.hotels || undefined,
      }
    })
    return { success: true, tour }
  } catch (error: any) {
    console.error("Error updating tour:", error)
    return { success: false, error: error?.message || "Tur güncellenemedi." }
  }
}
