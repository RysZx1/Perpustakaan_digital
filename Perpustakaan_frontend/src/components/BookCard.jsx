import { useState } from "react"
import { User as UserIcon, Building, BookOpen } from "lucide-react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import ConfirmDialog from "./ui/confirm-dialog"

export default function BookCard({ book, onPinjam }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const isAvailable = book.stok > 0

  const handleConfirm = async () => {
    setLoading(true)
    await onPinjam(book.id)
    setLoading(false)
    setConfirmOpen(false)
  }

  return (
    <>
      <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md">
        <CardContent className="flex-1 p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-base leading-snug text-foreground line-clamp-2">
              {book.judul}
            </h3>
            <Badge variant="outline" className="shrink-0">
              {book.tahun_terbit || book.tahun}
            </Badge>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <UserIcon className="h-3.5 w-3.5 shrink-0" />
              <span>
                <span className="font-medium text-foreground">Penulis:</span>{" "}
                {book.penulis}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-3.5 w-3.5 shrink-0" />
              <span>
                <span className="font-medium text-foreground">Penerbit:</span>{" "}
                {book.penerbit}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/30 px-5 py-3">
          <div className="flex w-full items-center justify-between">
            <Badge variant={isAvailable ? "success" : "destructive"} className="text-xs">
              {isAvailable ? `${book.stok} Tersedia` : "Habis"}
            </Badge>
            <Button
              size="sm"
              disabled={!isAvailable}
              onClick={() => setConfirmOpen(true)}
            >
              <BookOpen className="h-4 w-4" />
              {isAvailable ? "Pinjam" : "Habis"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Konfirmasi Peminjaman"
        description={`Apakah Anda yakin ingin meminjam buku "${book.judul}"? Buku ini harus dikembalikan dalam kondisi baik.`}
        confirmLabel="Ya, Pinjam"
        cancelLabel="Batal"
        variant="borrow"
        loading={loading}
        onConfirm={handleConfirm}
      />
    </>
  )
}
