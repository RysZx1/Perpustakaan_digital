import { useState, useEffect } from "react"
import { Search, BookPlus, BookOpen, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ConfirmDialog from "../ui/confirm-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"

export default function BookTable({ books = [], onPinjam, user, onEditBook, onDeleteBook }) {
  const [search, setSearch] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  
  // Admin states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [bookToEdit, setBookToEdit] = useState(null)
  const [editForm, setEditForm] = useState({ judul: "", penulis: "", penerbit: "", tahun: "", stok: "" })
  
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

  // Admin handlers
  const handleEditClick = (book) => {
    setBookToEdit(book)
    setEditForm({
      judul: book.judul,
      penulis: book.penulis,
      penerbit: book.penerbit || "",
      tahun: book.tahun_terbit || book.tahun || "",
      stok: book.stok
    })
    setEditOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onEditBook(bookToEdit.id, editForm)
    setLoading(false)
    setEditOpen(false)
    setBookToEdit(null)
  }

  const handleDeleteClick = (book) => {
    setBookToDelete(book)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return
    setLoading(true)
    await onDeleteBook(bookToDelete.id)
    setLoading(false)
    setDeleteConfirmOpen(false)
    setBookToDelete(null)
  }

  return (
    <>
      <Card className="border-white/60 shadow-xl shadow-slate-200/40 bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-white/50 bg-white/40 px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base flex items-center gap-2.5 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              Semua Buku
              <span className="text-xs font-normal text-muted-foreground ml-1">
                ({filtered.length} buku)
              </span>
            </CardTitle>
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari judul atau penulis..."
                className="pl-9 h-9 text-sm border-slate-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="text-xs font-semibold text-muted-foreground pl-5">Judul</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground">Penulis</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground">Tahun</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground">Stok</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground text-right pr-5">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 opacity-20" />
                        <p className="text-sm">{search ? "Buku tidak ditemukan" : "Belum ada buku"}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((book) => (
                    <TableRow key={book.id} className="hover:bg-slate-50/60 border-slate-100">
                      <TableCell className="font-medium text-sm pl-5 max-w-[200px]">
                        <span className="line-clamp-1">{book.judul}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{book.penulis}</TableCell>
                      <TableCell className="text-muted-foreground text-sm tabular">{book.tahun_terbit || book.tahun}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          book.stok > 0
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${book.stok > 0 ? "bg-emerald-500" : "bg-slate-400"}`} />
                          {book.stok > 0 ? `${book.stok} tersedia` : "Habis"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-5">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            disabled={book.stok <= 0}
                            onClick={() => handlePinjamClick(book)}
                            className="h-8 text-xs font-semibold"
                          >
                            <BookPlus className="h-3.5 w-3.5 mr-1.5" />
                            Pinjam
                          </Button>
                          
                          {user?.role === 'admin' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditClick(book)}
                                className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                                title="Edit Buku"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteClick(book)}
                                className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                                title="Hapus Buku"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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
            ? `Pinjam buku "${selectedBook.judul}"?`
            : ""
        }
        confirmLabel="Ya, Pinjam"
        cancelLabel="Batal"
        variant="borrow"
        loading={loading}
        onConfirm={handleConfirm}
      />

      {user?.role === 'admin' && (
        <>
          <ConfirmDialog
            open={deleteConfirmOpen}
            onOpenChange={(open) => {
              if (!loading) {
                setDeleteConfirmOpen(open)
                if (!open) setBookToDelete(null)
              }
            }}
            title="Hapus Buku"
            description={
              bookToDelete
                ? `Apakah Anda yakin ingin menghapus buku "${bookToDelete.judul}"? Tindakan ini tidak dapat dibatalkan.`
                : ""
            }
            confirmLabel="Ya, Hapus"
            cancelLabel="Batal"
            variant="danger"
            loading={loading}
            onConfirm={handleConfirmDelete}
          />

          <Dialog open={editOpen} onOpenChange={(open) => {
            if (!loading) {
              setEditOpen(open)
              if (!open) setBookToEdit(null)
            }
          }}>
            <DialogContent className="sm:max-w-md bg-white border-slate-100 shadow-xl rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Pencil className="h-5 w-5 text-primary" />
                  Edit Buku
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-judul">Judul Buku</Label>
                  <Input
                    id="edit-judul"
                    value={editForm.judul}
                    onChange={(e) => setEditForm({...editForm, judul: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-penulis">Penulis</Label>
                  <Input
                    id="edit-penulis"
                    value={editForm.penulis}
                    onChange={(e) => setEditForm({...editForm, penulis: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-penerbit">Penerbit</Label>
                  <Input
                    id="edit-penerbit"
                    value={editForm.penerbit}
                    onChange={(e) => setEditForm({...editForm, penerbit: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-tahun">Tahun Terbit</Label>
                    <Input
                      id="edit-tahun"
                      type="number"
                      value={editForm.tahun}
                      onChange={(e) => setEditForm({...editForm, tahun: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-stok">Jumlah Stok</Label>
                    <Input
                      id="edit-stok"
                      type="number"
                      value={editForm.stok}
                      onChange={(e) => setEditForm({...editForm, stok: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full font-semibold" disabled={loading}>
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}
