import { useState } from "react"
import { LogIn, UserPlus, Mail, Lock, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [tab, setTab] = useState("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [regNama, setRegNama] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    onLogin(loginEmail, loginPassword)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    onRegister(regNama, regEmail, regPassword)
    setRegNama("")
    setRegEmail("")
    setRegPassword("")
  }

  const switchTab = (newTab) => {
    setTab(newTab)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {tab === "login" ? "Masuk ke Akun" : "Daftar Akun Baru"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex border-b mb-4">
          <button
            onClick={() => switchTab("login")}
            className={`flex-1 pb-2 text-sm font-medium text-center transition-colors ${
              tab === "login"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LogIn className="h-4 w-4 inline mr-1.5" />
            Masuk
          </button>
          <button
            onClick={() => switchTab("register")}
            className={`flex-1 pb-2 text-sm font-medium text-center transition-colors ${
              tab === "register"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserPlus className="h-4 w-4 inline mr-1.5" />
            Daftar
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="budi@example.com"
                  className="pl-9"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  className="pl-9"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="h-4 w-4" />
              Masuk Sesi
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="reg-nama">Nama Lengkap</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reg-nama"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="pl-9"
                  value={regNama}
                  onChange={(e) => setRegNama(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-email">Email Baru</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="budi@example.com"
                  className="pl-9"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  className="pl-9"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              <UserPlus className="h-4 w-4" />
              Buat Akun & Gabung
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
