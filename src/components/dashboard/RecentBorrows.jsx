import { useState } from "react"
import { Clock, ScrollText, Undo2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ConfirmDialog from "../ui/confirm-dialog"

export default function RecentBorrows({ borrows = [], onReturn }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedBorrow, setSelectedBorrow] = useState(null)
  const [loading, setLoading] = useState(false)

  const recent = borrows.filter((b) => b.status === "dipinjam").slice(0, 5)

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
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ScrollText className="h-4 w-4 text-muted-foreground" />
            Peminjaman Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Tidak ada peminjaman aktif
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Buku</TableHead>
                  <TableHead className="text-xs">Tanggal</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-sm font-medium">
                      {item.Book?.judul || `Buku #${item.BookId}`}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="warning" className="text-[10px] px-2 py-0.5">
                        Dipinjam
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReturnClick(item)}
                        className="h-7 text-[10px] px-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Undo2 className="h-3 w-3 mr-1" />
                        Kembali
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
