import { useState } from "react"
import { ScrollText, BookOpen, Undo2, CheckCircle2, Clock } from "lucide-react"
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

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })
      : "-"

  return (
    <>
      <Card className="border-white/60 shadow-xl shadow-slate-200/40 bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-white/50 bg-white/40 px-5 py-4">
          <CardTitle className="flex items-center gap-2.5 text-base font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
              <ScrollText className="h-4 w-4 text-amber-600" />
            </div>
            Riwayat Pinjaman
            <div className="ml-auto flex items-center gap-2">
              {activeBorrows.length > 0 && (
                <Badge className="bg-amber-100 text-amber-700 border-0 text-xs font-semibold">
                  {activeBorrows.length} Aktif
                </Badge>
              )}
              {returnedBorrows.length > 0 && (
                <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs font-semibold">
                  {returnedBorrows.length} Kembali
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {borrows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
                <BookOpen className="h-7 w-7 opacity-30" />
              </div>
              <p className="font-semibold text-foreground mb-1">Belum ada pinjaman</p>
              <p className="text-sm">Pinjam buku dari katalog untuk memulai.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {/* Active borrows */}
              {activeBorrows.length > 0 && (
                <div>
                  <div className="flex items-center gap-2.5 px-5 py-3 bg-amber-50/60">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">
                      Sedang Dipinjam ({activeBorrows.length})
                    </span>
                  </div>
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
                        {activeBorrows.map((item) => (
                          <TableRow key={item.id} className="hover:bg-slate-50/70 border-slate-100">
                            <TableCell className="font-medium pl-5 text-sm">
                              {item.Book?.judul || `Buku #${item.BookId}`}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm tabular">
                              {formatDate(item.createdAt)}
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
                </div>
              )}

              {/* Returned */}
              {returnedBorrows.length > 0 && (
                <div>
                  <div className="flex items-center gap-2.5 px-5 py-3 bg-emerald-50/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-800">
                      Sudah Dikembalikan ({returnedBorrows.length})
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-slate-100">
                          <TableHead className="text-xs font-semibold text-muted-foreground pl-5">Buku</TableHead>
                          <TableHead className="text-xs font-semibold text-muted-foreground">Dipinjam</TableHead>
                          <TableHead className="text-xs font-semibold text-muted-foreground">Dikembalikan</TableHead>
                          <TableHead className="text-xs font-semibold text-muted-foreground">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {returnedBorrows.map((item) => (
                          <TableRow key={item.id} className="hover:bg-slate-50/70 border-slate-100">
                            <TableCell className="font-medium pl-5 text-sm">
                              {item.Book?.judul || `Buku #${item.BookId}`}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm tabular">
                              {formatDate(item.createdAt)}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm tabular">
                              {formatDate(item.tanggal_kembali)}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                                <CheckCircle2 className="h-3 w-3" />
                                Dikembalikan
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
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
