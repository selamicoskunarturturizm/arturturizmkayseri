import Link from "next/link"
import { logout } from "@/features/auth/actions"
import { LayoutDashboard, Plane, CalendarCheck, LogOut, ImageIcon } from "lucide-react"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="text-lg font-bold text-primary">Artur Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/tours" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <Plane className="h-5 w-5" />
            <span className="font-medium">Turlar</span>
          </Link>
          <Link href="/admin/appointments" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <CalendarCheck className="h-5 w-5" />
            <span className="font-medium">Randevular</span>
          </Link>
          <Link href="/admin/galeri" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <ImageIcon className="h-5 w-5" />
            <span className="font-medium">Galeri</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-3 px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8">
          <h2 className="text-xl font-semibold text-slate-800">Yönetim Paneli</h2>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
