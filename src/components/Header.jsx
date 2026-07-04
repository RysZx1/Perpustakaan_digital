import { BookOpen, LogOut, User, Shield, LogIn } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function Header({ token, user, onLoginClick, onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Perpustakaan Digital</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">Kelompok 2</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-xs">
                {user.role === "admin" ? (
                  <Shield className="h-3.5 w-3.5" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
                {user.role === "admin" ? "Admin" : "Anggota"}: {user.role === "admin" ? "Admin" : user.nama}
              </Badge>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={onLoginClick}>
              <LogIn className="h-4 w-4" />
              Login Anggota
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
