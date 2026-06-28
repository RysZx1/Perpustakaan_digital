import { useState, useEffect } from "react"
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
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  const initials = user.nama
    ? user.nama.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Fitur", href: "#features" },
    { label: "Katalog", href: "#katalog" },
  ]

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/40 backdrop-blur-2xl shadow-sm border-b border-white/50"
          : "bg-white/10 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-base font-bold tracking-tight font-display leading-tight">
              Perpustakaan Digital
            </p>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5 font-sans tracking-wide uppercase">
              Kelompok 2
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors
                  after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-primary
                  after:transition-all after:duration-200 hover:after:w-full"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors
                  after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-primary
                  after:transition-all after:duration-200 hover:after:w-full"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1
                  border border-slate-200 hover:border-slate-300 hover:bg-slate-50
                  transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                  <Avatar className="h-7 w-7 border-2 border-primary/20">
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
              <DropdownMenuContent align="end" className="w-52 mt-1">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    {user.role === "admin" ? (
                      <Shield className="h-3.5 w-3.5 text-amber-500" />
                    ) : (
                      <User className="h-3.5 w-3.5 text-primary" />
                    )}
                    <span className="text-sm">{user.nama}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={onLoginClick} className="shadow-sm">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur-sm px-4 py-4 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Beranda
          </Link>
          <a
            href="#features"
            className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Fitur
          </a>
          <a
            href="#katalog"
            className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Katalog
          </a>
          {token && (
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
