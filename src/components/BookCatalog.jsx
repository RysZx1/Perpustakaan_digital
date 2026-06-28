import { useState } from "react"
import { RotateCcw, BookOpen, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import BookCard from "./BookCard"

export default function BookCatalog({ books, onPinjam, onRefresh }) {
  const [search, setSearch] = useState("")

  const filteredBooks = books.filter(
    (b) =>
      b.judul?.toLowerCase().includes(search.toLowerCase()) ||
      b.penulis?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            Katalog Buku Tersedia
          </h2>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari judul atau penulis..."
              className="pl-8 h-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={onRefresh} className="h-9">
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <BookOpen className="h-12 w-12 mb-4 opacity-30" />
          <p className="text-lg font-medium">Belum ada buku tersedia</p>
          <p className="text-sm">Silakan hubungi admin untuk menambahkan koleksi buku.</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Search className="h-12 w-12 mb-4 opacity-30" />
          <p className="text-lg font-medium">Buku tidak ditemukan</p>
          <p className="text-sm">Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((buku) => (
            <BookCard key={buku.id} book={buku} onPinjam={onPinjam} />
          ))}
        </div>
      )}
    </section>
  )
}
