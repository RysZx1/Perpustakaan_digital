import { useState } from "react"
import { Star, BookPlus, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import ConfirmDialog from "../ui/confirm-dialog"

export default function PopularBooks({ books = [], onPinjam }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(false)

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
      <Card className="border-white/60 shadow-xl shadow-slate-200/40 bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-white/50 bg-white/40 px-5 py-4">
          <CardTitle className="flex items-center gap-2.5 text-base font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
              <Flame className="h-4 w-4 text-amber-600" />
            </div>
            Buku Terpopuler
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularBooks.map((book) => (
              <div
                key={book.id}
                className="group bg-slate-50/70 border border-slate-100 rounded-xl p-4 hover:border-amber-200
                  hover:bg-amber-50/40 card-lift flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    book.stok > 0
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-500"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${book.stok > 0 ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {book.stok > 0 ? "Tersedia" : "Habis"}
                  </span>
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </div>
                <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-foreground font-sans" title={book.judul}>
                  {book.judul}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-1 font-sans">{book.penulis}</p>
                <div className="mt-auto">
                  <Button
                    size="sm"
                    className="w-full text-xs h-8 font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                    disabled={book.stok <= 0}
                    onClick={() => handlePinjamClick(book)}
                  >
                    <BookPlus className="h-3.5 w-3.5 mr-1.5" />
                    Pinjam
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
            ? `Apakah Anda yakin ingin meminjam buku "${selectedBook.judul}"?`
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
