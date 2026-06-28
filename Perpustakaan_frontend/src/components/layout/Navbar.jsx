import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BookOpen, Menu, X, LogIn, User, Shield, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function Navbar({ token, user, onLoginClick, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const initials = user.nama
    ? user.nama.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold tracking-tight">Perpustakaan Digital</h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5">Kelompok 2</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Beranda
          </Link>
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Fitur
          </a>
          <a href="#katalog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Katalog
          </a>
        </div>

        <div className="flex items-center gap-3">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 outline-none">
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium leading-tight">{user.nama}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight capitalize">{user.role}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    {user.role === "admin" ? (
                      <Shield className="h-4 w-4 text-amber-500" />
                    ) : (
                      <User className="h-4 w-4 text-blue-500" />
                    )}
                    <span>{user.nama}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive">
                  <LogOut className="h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={onLoginClick}>
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          <Link to="/" className="block text-sm font-medium">Beranda</Link>
          <a href="#features" className="block text-sm font-medium">Fitur</a>
          <a href="#katalog" className="block text-sm font-medium">Katalog</a>
          {token && (
            <Link to="/dashboard" className="block text-sm font-medium">Dashboard</Link>
          )}
        </div>
      )}
    </nav>
  )
}
