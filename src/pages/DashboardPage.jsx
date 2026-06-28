import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import {
  LayoutDashboard, BookOpen, LogOut, Menu, X, LogIn,
  History, ChevronRight, BookMarked, Home,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import StatsGrid from "../components/dashboard/StatsGrid"
import BookTable from "../components/dashboard/BookTable"
import RecentBorrows from "../components/dashboard/RecentBorrows"
import PopularBooks from "../components/dashboard/PopularBooks"
import AdminPanel from "../components/AdminPanel"
import BorrowHistory from "../components/BorrowHistory"
import BookCatalog from "../components/BookCatalog"
import { Card, CardContent } from "../components/ui/card"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "katalog", label: "Katalog Buku", icon: BookOpen },
  { id: "riwayat", label: "Riwayat Pinjaman", icon: History },
]

export default function DashboardPage({
  token, user, books, borrows,
  onLogout, onPinjam, onReturn, onAddBook, onRefresh,
  onEditBook, onDeleteBook,
}) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [bookForm, setBookForm] = useState({
    judul: "", penulis: "", penerbit: "", tahun: "", stok: "",
  })

  const initials = user.nama
    ? user.nama.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  const handleAddBook = useCallback(
    async (e) => {
      e.preventDefault()
      await onAddBook(bookForm)
      setBookForm({ judul: "", penulis: "", penerbit: "", tahun: "", stok: "" })
    },
    [bookForm, onAddBook]
  )

  if (!token) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-5 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mx-auto">
            <BookOpen className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Akses Ditolak</h2>
            <p className="text-muted-foreground text-sm">Silakan login untuk mengakses dashboard.</p>
          </div>
          <Button onClick={() => navigate("/")} className="w-full">
            <LogIn className="h-4 w-4 mr-2" />
            Login Sekarang
          </Button>
        </div>
      </div>
    )
  }

  const tabLabel = NAV_ITEMS.find((n) => n.id === activeTab)?.label || "Dashboard"

  const SidebarContent = (
    <div className="flex flex-col h-full sidebar-glass">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-md">
          <BookOpen className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 font-display leading-tight">Perpustakaan</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Digital</p>
        </div>
      </div>

      {/* User card */}
      <div className="mx-3 mt-4 mb-2 rounded-xl p-3 flex items-center gap-3 bg-slate-100/50 border border-slate-200/50">
        <Avatar className="h-9 w-9 border-2 border-white">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{user.nama}</p>
          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 py-0 mt-0.5 capitalize h-4 bg-primary/10 text-primary border-0 font-medium hover:bg-primary/20"
          >
            {user.role}
          </Badge>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        <p className="text-[10px] uppercase tracking-widest px-3 pt-2 pb-1.5 font-semibold text-slate-400">
          Menu Utama
        </p>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setSidebarOpen(false) }}
            className={`sidebar-item ${activeTab === id ? "active" : ""}`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
            {activeTab === id && <ChevronRight className="h-3 w-3 ml-auto opacity-60" />}
          </button>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-slate-200/50 space-y-1">
        <button
          className="sidebar-item"
          onClick={() => navigate("/")}
        >
          <Home className="h-4 w-4 shrink-0" />
          Kembali ke Beranda
        </button>
        <button
          className="sidebar-item text-rose-400 hover:text-rose-300"
          onClick={() => { onLogout(); navigate("/") }}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Keluar
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-dvh bg-slate-50 relative overflow-hidden">
      {/* Ambient background blobs to make glassmorphism visible */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-[100px] pointer-events-none" />
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-60 flex-col z-30 shadow-xl">
        {SidebarContent}
      </aside>

      {/* Sidebar mobile */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 z-50 transition-transform duration-250 ease-out lg:hidden shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {SidebarContent}
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/40 backdrop-blur-2xl border-b border-white/50 shadow-sm">
          <div className="flex items-center gap-3 px-4 lg:px-6 h-14">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Buka sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground hidden sm:block">Dashboard</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground hidden sm:block" />
              <span className="font-semibold">{tabLabel}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {activeTab === "dashboard" && (
            <>
              {/* Welcome */}
              <Card className="border-white/60 shadow-xl shadow-slate-200/40 mb-6 bg-white/50 backdrop-blur-xl overflow-hidden relative">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <CardContent className="p-6 sm:p-8 flex items-center justify-between relative z-10">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                      Selamat datang kembali, <span className="text-primary">{user.nama?.split(" ")[0]}</span> 👋
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                      {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <Avatar className="h-16 w-16 border-4 border-white shadow-sm hidden sm:flex">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{initials}</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>

              <StatsGrid books={books} borrows={borrows} />

              {user.role === "admin" && (
                <AdminPanel
                  bookForm={bookForm}
                  onBookFormChange={setBookForm}
                  onSubmit={handleAddBook}
                />
              )}

              <BookCatalog books={books} onPinjam={onPinjam} onRefresh={onRefresh} />

              <PopularBooks books={books} onPinjam={onPinjam} />

              <RecentBorrows borrows={borrows} onReturn={onReturn} />
            </>
          )}

          {activeTab === "katalog" && (
            <BookTable 
              books={books} 
              onPinjam={onPinjam} 
              onRefresh={onRefresh} 
              user={user}
              onEditBook={onEditBook}
              onDeleteBook={onDeleteBook}
            />
          )}

          {activeTab === "riwayat" && (
            <BorrowHistory borrows={borrows} onReturn={onReturn} />
          )}
        </main>
      </div>
    </div>
  )
}
