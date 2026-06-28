import { useState } from "react"
import { Clock, History, Undo2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
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
      <Card className="border-white/60 shadow-xl shadow-slate-200/40 bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-white/50 bg-white/40 px-5 py-4">
          <CardTitle className="flex items-center gap-2.5 text-base font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <History className="h-4 w-4 text-blue-600" />
            </div>
            Peminjaman Aktif
            {recent.length > 0 && (
              <span className="ml-auto text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {recent.length} aktif
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Clock className="h-9 w-9 mb-3 opacity-20" />
              <p className="text-sm font-medium text-foreground">Tidak ada peminjaman aktif</p>
              <p className="text-xs mt-1">Semua buku sudah dikembalikan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="text-xs font-semibold text-muted-foreground pl-5">Buku</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Tanggal Pinjam</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-right pr-5">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50/60 border-slate-100">
                      <TableCell className="text-sm font-medium pl-5">
                        {item.Book?.judul || `Buku #${item.BookId}`}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground tabular">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {new Date(item.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Dipinjam
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReturnClick(item)}
                          className="h-8 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300"
                        >
                          <Undo2 className="h-3.5 w-3.5 mr-1.5" />
                          Kembalikan
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
            ? `Kembalikan buku "${selectedBorrow.Book?.judul || selectedBorrow.BookId}"?`
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
