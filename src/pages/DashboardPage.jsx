import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutDashboard, BookOpen, LogOut, Menu, X, LogIn, History } from "lucide-react"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import StatsGrid from "../components/dashboard/StatsGrid"
import BookTable from "../components/dashboard/BookTable"
import RecentBorrows from "../components/dashboard/RecentBorrows"
import PopularBooks from "../components/dashboard/PopularBooks"
import AdminPanel from "../components/AdminPanel"
import BorrowHistory from "../components/BorrowHistory"
import BookCatalog from "../components/BookCatalog"

export default function DashboardPage({
  token,
  user,
  books,
  borrows,
  onLogout,
  onPinjam,
  onReturn,
  onAddBook,
  onRefresh,
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto" />
          <h2 className="text-2xl font-bold">Akses Ditolak</h2>
          <p className="text-muted-foreground">Silakan login untuk mengakses dashboard.</p>
          <Button onClick={() => navigate("/")}>
            <LogIn className="h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    )
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-1">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{user.nama}</p>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {user.role}
            </Badge>
          </div>
        </div>
      </div>
      <Separator />
      <nav className="flex-1 p-3 space-y-1">
        <button
          onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            activeTab === "dashboard"
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </button>
        <button
          onClick={() => { setActiveTab("katalog"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            activeTab === "katalog"
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Katalog
        </button>
        <button
          onClick={() => { setActiveTab("riwayat"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            activeTab === "riwayat"
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <History className="h-4 w-4" />
          Riwayat Pinjaman
        </button>
      </nav>
      <div className="p-3 border-t">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
          size="sm"
          onClick={() => {
            onLogout()
            navigate("/")
          }}
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-60 border-r bg-white flex-col z-30">
        {SidebarContent}
      </aside>

      {/* Sidebar - mobile */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-72 bg-white border-r z-50 transition-transform duration-200 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-md hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {SidebarContent}
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <button
              className="lg:hidden p-1.5 rounded-md hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-semibold hidden sm:block">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                Beranda
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onLogout()
                  navigate("/")
                }}
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {activeTab === "dashboard" && (
            <>
              {/* Stats */}
              <StatsGrid books={books} borrows={borrows} />

              {/* Admin Panel */}
              {user.role === "admin" && (
                <AdminPanel
                  bookForm={bookForm}
                  onBookFormChange={setBookForm}
                  onSubmit={handleAddBook}
                />
              )}

              {/* Full Catalog with Search */}
              <div className="pb-4">
                <BookCatalog books={books} onPinjam={onPinjam} onRefresh={onRefresh} />
              </div>

              {/* Popular Books */}
              <PopularBooks books={books} onPinjam={onPinjam} />

              {/* Recent Borrows */}
              <div className="grid grid-cols-1 gap-6">
                <RecentBorrows borrows={borrows} onReturn={onReturn} />
              </div>
            </>
          )}

          {activeTab === "katalog" && (
            <BookTable books={books} onPinjam={onPinjam} onRefresh={onRefresh} />
          )}

          {activeTab === "riwayat" && (
            <BorrowHistory borrows={borrows} onReturn={onReturn} />
          )}
        </main>
      </div>
    </div>
  )
}
