import { useState } from "react"
import { Star, BookPlus, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import ConfirmDialog from "../ui/confirm-dialog"

export default function PopularBooks({ books = [], onPinjam }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(false)

  // Ambil 4 buku pertama sebagai simulasi buku terpopuler/rekomendasi
  const popularBooks = books.slice(0, 4)

  if (popularBooks.length === 0) return null

  const handlePinjamClick = (book) => {
    setSelectedBook(book)
    setConfirmOpen(true)
  }

  const handleConfirm = async () => {
    if (!selectedBook) return
    setLoading(true)
    await onPinjam(selectedBook.id)
    setLoading(false)
    setConfirmOpen(false)
    setSelectedBook(null)
  }

  return (
    <>
      <Card className="shadow-sm border-amber-200 bg-gradient-to-br from-amber-50 to-white relative overflow-hidden">
        {/* Dekorasi background */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-60"></div>
        
        <CardHeader className="pb-3 relative z-10">
          <CardTitle className="text-base flex items-center gap-2 text-amber-700">
            <Trophy className="h-5 w-5 text-amber-500" />
            Buku Terpopuler Bulan Ini
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularBooks.map((book) => (
              <div key={book.id} className="group bg-white border border-amber-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:border-amber-300 flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant={book.stok > 0 ? "success" : "destructive"} className="text-[10px]">
                    {book.stok > 0 ? "Tersedia" : "Habis"}
                  </Badge>
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                </div>
                
                <h3 className="font-semibold text-sm line-clamp-2 mb-1" title={book.judul}>{book.judul}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{book.penulis}</p>
                
                <div className="mt-auto pt-4">
                  <Button 
                    size="sm" 
                    className="w-full text-xs h-8 bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                    disabled={book.stok <= 0}
                    onClick={() => handlePinjamClick(book)}
                  >
                    <BookPlus className="h-3.5 w-3.5 mr-1.5" />
                    Pinjam Buku
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!loading) {
            setConfirmOpen(open)
            if (!open) setSelectedBook(null)
          }
        }}
        title="Konfirmasi Peminjaman"
        description={
          selectedBook
            ? `Apakah Anda yakin ingin meminjam buku rekomendasi "${selectedBook.judul}"?`
            : ""
        }
        confirmLabel="Ya, Pinjam"
        cancelLabel="Batal"
        variant="borrow"
        loading={loading}
        onConfirm={handleConfirm}
      />
    </>
  )
}
