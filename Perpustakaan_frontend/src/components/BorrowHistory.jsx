import { useState } from "react"
import { ScrollText, BookOpen, Undo2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import ConfirmDialog from "./ui/confirm-dialog"

export default function BorrowHistory({ borrows = [], onReturn }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedBorrow, setSelectedBorrow] = useState(null)
  const [loading, setLoading] = useState(false)

  const activeBorrows = borrows.filter((b) => b.status === "dipinjam")
  const returnedBorrows = borrows.filter((b) => b.status === "dikembalikan")

  const handleReturnClick = (borrow) => {
    setSelectedBorrow(borrow)
    setConfirmOpen(true)
  }

  const handleConfirmReturn = async () => {
    if (!selectedBorrow) return
    setLoading(true)
    await onReturn(selectedBorrow.id)
    setLoading(false)
    setConfirmOpen(false)
    setSelectedBorrow(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ScrollText className="h-5 w-5 text-amber-500" />
            Riwayat Pinjaman Buku
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeBorrows.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Sedang Dipinjam ({activeBorrows.length})
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buku</TableHead>
                    <TableHead>Tanggal Pinjam</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeBorrows.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.Book?.judul || `Buku #${item.BookId}`}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="warning">Dipinjam</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReturnClick(item)}
                          className="h-8 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        >
                          <Undo2 className="h-3.5 w-3.5" />
                          Kembalikan
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {returnedBorrows.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Riwayat Pengembalian ({returnedBorrows.length})
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buku</TableHead>
                    <TableHead>Tanggal Pinjam</TableHead>
                    <TableHead>Tanggal Kembali</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnedBorrows.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.Book?.judul || `Buku #${item.BookId}`}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.tanggal_kembali
                          ? new Date(item.tanggal_kembali).toLocaleDateString("id-ID", {
                              year: "numeric", month: "long", day: "numeric",
                            })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">Dikembalikan</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {borrows.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <BookOpen className="h-10 w-10 mb-3 opacity-30" />
              <p className="font-medium">Belum ada buku yang dipinjam</p>
              <p className="text-sm">Silakan pinjam buku dari katalog di atas.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!loading) {
            setConfirmOpen(open)
            if (!open) setSelectedBorrow(null)
          }
        }}
        title="Konfirmasi Pengembalian"
        description={
          selectedBorrow
            ? `Apakah Anda yakin ingin mengembalikan buku "${selectedBorrow.Book?.judul || selectedBorrow.BookId}"?`
            : ""
        }
        confirmLabel="Ya, Kembalikan"
        cancelLabel="Batal"
        variant="return"
        loading={loading}
        onConfirm={handleConfirmReturn}
      />
    </>
  )
}
