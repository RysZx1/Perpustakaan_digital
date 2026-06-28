import { BookPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

const fields = [
  { name: "judul",    label: "Judul Buku",    type: "text",   placeholder: "Masukkan judul buku" },
  { name: "penulis",  label: "Penulis",        type: "text",   placeholder: "Nama penulis" },
  { name: "penerbit", label: "Penerbit",       type: "text",   placeholder: "Nama penerbit" },
  { name: "tahun",    label: "Tahun Terbit",   type: "number", placeholder: "2024", min: 1950, max: 2026 },
  { name: "stok",     label: "Jumlah Stok",    type: "number", placeholder: "1" },
]

export default function AdminPanel({ bookForm, onBookFormChange, onSubmit }) {
  return (
    <Card className="border-white/60 shadow-xl shadow-slate-200/40 bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-white/50 bg-white/40 px-5 py-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <BookPlus className="h-4 w-4 text-primary" />
          </div>
          Tambah Koleksi Buku
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {field.label}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                value={bookForm[field.name]}
                onChange={(e) => onBookFormChange({ ...bookForm, [field.name]: e.target.value })}
                className="h-9 border-slate-200 focus:border-primary text-sm"
                required
              />
            </div>
          ))}
          <div className="sm:col-span-2 md:col-span-5 flex justify-end pt-1">
            <Button type="submit" className="font-semibold shadow-sm">
              <BookPlus className="h-4 w-4 mr-2" />
              Simpan Buku
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
