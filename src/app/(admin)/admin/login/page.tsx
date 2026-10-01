import { login } from "@/features/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Artur Turizm</h1>
          <h2 className="text-lg text-slate-600">Yönetim Paneli Girişi</h2>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-Posta</label>
            <Input name="email" type="email" required placeholder="admin@arturturizm.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Şifre</label>
            <Input name="password" type="password" required placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full h-12 mt-2">Giriş Yap</Button>
        </form>
      </div>
    </div>
  )
}
