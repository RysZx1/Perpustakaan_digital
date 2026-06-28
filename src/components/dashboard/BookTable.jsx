import { useState } from "react"
import { Search, BookPlus, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ConfirmDialog from "../ui/confirm-dialog"

export default function BookTable({ books = [], onPinjam }) {
  const [search, setSearch] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(false)

  const filtered = books.filter(
    (b) =>
      b.judul?.toLowerCase().includes(search.toLowerCase()) ||
      b.penulis?.toLowerCase().includes(search.toLowerCase())
  )

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
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Katalog Buku
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari judul atau penulis..."
                className="pl-8 h-9 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {search ? "Buku tidak ditemukan" : "Belum ada buku"}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.judul}</TableCell>
                    <TableCell className="text-muted-foreground">{book.penulis}</TableCell>
                    <TableCell>{book.tahun_terbit || book.tahun}</TableCell>
                    <TableCell>
                      <Badge variant={book.stok > 0 ? "success" : "destructive"} className="text-xs">
                        {book.stok > 0 ? `${book.stok} tersedia` : "habis"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={book.stok <= 0}
                        onClick={() => handlePinjamClick(book)}
                        className="h-8 text-xs"
                      >
                        <BookPlus className="h-3.5 w-3.5" />
                        Pinjam
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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
