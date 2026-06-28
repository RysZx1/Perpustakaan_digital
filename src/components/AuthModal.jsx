import { useState } from "react"
import { LogIn, UserPlus, Mail, Lock, User, BookOpen, Eye, EyeOff } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [regNama, setRegNama] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onLogin(loginEmail, loginPassword)
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onRegister(regNama, regEmail, regPassword)
    setLoading(false)
    setRegNama("")
    setRegEmail("")
    setRegPassword("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <div className="bg-slate-900 px-6 pt-8 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 border border-primary/30 mb-5">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className="text-2xl font-bold text-white tracking-tight">
              Perpustakaan Digital
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              Masuk atau buat akun baru untuk mulai meminjam buku secara online.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 bg-white">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100/80 p-1 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg font-medium text-sm data-[state=active]:shadow-sm">
                <LogIn className="h-4 w-4 mr-2" />
                Masuk
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg font-medium text-sm data-[state=active]:shadow-sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Daftar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Alamat Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="nama@example.com"
                      className="pl-9 h-11"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-9 pr-10 h-11"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 text-base font-semibold mt-2" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                      Memproses...
                    </span>
                  ) : (
                    "Masuk"
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-nama">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-nama"
                      type="text"
                      placeholder="Masukkan nama Anda"
                      className="pl-9 h-11"
                      value={regNama}
                      onChange={(e) => setRegNama(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Alamat Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="nama@example.com"
                      className="pl-9 h-11"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-password"
                      type={showRegPassword ? "text" : "password"}
                      placeholder="Minimal 6 karakter"
                      className="pl-9 pr-10 h-11"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 text-base font-semibold mt-2" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                      Memproses...
                    </span>
                  ) : (
                    "Buat Akun"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
