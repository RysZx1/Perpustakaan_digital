import { useState } from "react"
import { User as UserIcon, Building, BookOpen, Calendar } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import ConfirmDialog from "./ui/confirm-dialog"

// Fixed spine colors based on book id hash
const spineColors = [
  "bg-primary",
  "bg-amber-500",
  "bg-teal-600",
  "bg-violet-600",
  "bg-rose-500",
  "bg-sky-600",
  "bg-emerald-600",
  "bg-orange-500",
]

function getSpineColor(id) {
  return spineColors[(id || 0) % spineColors.length]
}

export default function BookCard({ book, onPinjam }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const isAvailable = book.stok > 0
  const spineColor = getSpineColor(book.id)

  const handleConfirm = async () => {
    setLoading(true)
    await onPinjam(book.id)
    setLoading(false)
    setConfirmOpen(false)
  }

  return (
    <>
      <div className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden card-lift">
        {/* Book spine accent bar */}
        <div className={`h-1.5 w-full ${spineColor}`} />

        <div className="flex-1 p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-semibold text-base leading-snug text-foreground line-clamp-2 font-sans flex-1">
              {book.judul}
            </h3>
            <span className="shrink-0 text-xs text-muted-foreground border border-slate-200 rounded-md px-2 py-0.5 tabular font-sans">
              {book.tahun_terbit || book.tahun}
            </span>
          </div>

          {/* Meta */}
          <div className="space-y-1.5 text-sm text-muted-foreground font-sans">
            <div className="flex items-center gap-2">
              <UserIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{book.penulis}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{book.penerbit}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50/70 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-slate-300"}`} />
            <span className={`text-xs font-semibold font-sans ${isAvailable ? "text-emerald-700" : "text-slate-400"}`}>
              {isAvailable ? `${book.stok} Tersedia` : "Habis"}
            </span>
          </div>
          <Button
            size="sm"
            disabled={!isAvailable}
            onClick={() => setConfirmOpen(true)}
            className={`h-8 text-xs font-semibold ${
              isAvailable
                ? "bg-primary hover:bg-primary/90 text-white shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            {isAvailable ? "Pinjam" : "Habis"}
          </Button>
        </div>
      </div>

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
