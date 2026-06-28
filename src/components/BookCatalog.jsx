import { useState } from "react"
import { RotateCcw, BookOpen, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import BookCard from "./BookCard"

export default function BookCatalog({ books, onPinjam, onRefresh }) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all") // all | available

  const filteredBooks = books.filter((b) => {
    const matchSearch =
      b.judul?.toLowerCase().includes(search.toLowerCase()) ||
      b.penulis?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || (filter === "available" && b.stok > 0)
    return matchSearch && matchFilter
  })

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-display">Katalog Buku</h2>
          </div>
          <p className="text-sm text-muted-foreground font-sans ml-10.5">
            {filteredBooks.length} buku ditemukan
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Filter toggle */}
          <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-slate-50"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter("available")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === "available"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-slate-50"
              }`}
            >
              Tersedia
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari judul atau penulis..."
              className="pl-9 h-9 text-sm bg-white border-slate-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button variant="outline" size="sm" onClick={onRefresh} className="h-9 border-slate-200 bg-white">
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline ml-1.5">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 opacity-40" />
          </div>
          <p className="text-lg font-semibold text-foreground mb-1">Belum ada buku</p>
          <p className="text-sm text-center max-w-xs">
            Silakan hubungi admin untuk menambahkan koleksi buku ke katalog.
          </p>
          <Button variant="outline" size="sm" onClick={onRefresh} className="mt-4">
            <RotateCcw className="h-4 w-4 mr-2" />
            Coba Lagi
          </Button>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 opacity-40" />
          </div>
          <p className="text-lg font-semibold text-foreground mb-1">Buku tidak ditemukan</p>
          <p className="text-sm">Coba gunakan kata kunci pencarian yang lain.</p>
          <button
            className="mt-4 text-sm text-primary hover:underline"
            onClick={() => { setSearch(""); setFilter("all") }}
          >
            Reset pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((buku) => (
            <BookCard key={buku.id} book={buku} onPinjam={onPinjam} />
          ))}
        </div>
      )}
    </section>
  )
}
