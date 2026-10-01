import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

export default async function AdminToursPage() {
  const tours = await prisma.tour.findMany({
    orderBy: { created_at: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Turlar</h1>
        <Button asChild>
          <Link href="/admin/tours/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Yeni Tur Ekle
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Tur Adı</th>
                <th className="px-6 py-4">Süre</th>
                <th className="px-6 py-4">Fiyat</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tours.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Henüz tur eklenmemiş.
                  </td>
                </tr>
              ) : tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {tour.title}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {tour.duration} Gün
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {tour.price}
                  </td>
                  <td className="px-6 py-4">
                    {tour.is_active ? (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        Pasif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/tours/${tour.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <form action={async () => {
                        "use server"
                        try {
                          await prisma.tour.delete({ where: { id: tour.id } })
                          revalidatePath("/admin/tours")
                        } catch (error) {
                          console.error("Delete failed, likely already deleted or has relations", error)
                        }
                      }}>
                        <Button variant="outline" size="sm" type="submit" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
