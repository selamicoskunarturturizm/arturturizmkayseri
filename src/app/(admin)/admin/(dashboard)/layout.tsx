import Link from "next/link"
import { logout } from "@/features/auth/actions"
import { LayoutDashboard, Plane, CalendarCheck, LogOut, ImageIcon } from "lucide-react"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50 relative overflow-hidden">
      {/* Mobile Drawer Checkbox (Hidden) */}
      <input type="checkbox" id="admin-menu-toggle" className="peer hidden" />

      {/* Overlay for mobile */}
      <label 
        htmlFor="admin-menu-toggle" 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity md:hidden"
      ></label>

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col -translate-x-full peer-checked:translate-x-0 md:translate-x-0 transition-transform duration-300 md:static md:flex-shrink-0">
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <span className="text-lg font-bold text-primary">Artur Admin</span>
          <label htmlFor="admin-menu-toggle" className="p-2 -mr-2 cursor-pointer md:hidden text-slate-500 hover:bg-slate-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </label>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <LayoutDashboard className="h-5 w-5 shrink-0" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/tours" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <Plane className="h-5 w-5 shrink-0" />
            <span className="font-medium">Turlar</span>
          </Link>
          <Link href="/admin/appointments" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <CalendarCheck className="h-5 w-5 shrink-0" />
            <span className="font-medium">Randevular</span>
          </Link>
          <Link href="/admin/galeri" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
            <ImageIcon className="h-5 w-5 shrink-0" />
            <span className="font-medium">Galeri</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-3 px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-8 shrink-0">
          <label htmlFor="admin-menu-toggle" className="p-2 mr-3 cursor-pointer md:hidden text-slate-500 hover:bg-slate-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </label>
          <h2 className="text-xl font-semibold text-slate-800">Yönetim Paneli</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
