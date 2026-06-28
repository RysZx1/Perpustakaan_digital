import { BookPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

export default function AdminPanel({ bookForm, onBookFormChange, onSubmit }) {
  const fields = [
    { name: "judul", label: "Judul Buku", type: "text", placeholder: "Masukkan judul buku" },
    { name: "penulis", label: "Penulis", type: "text", placeholder: "Nama penulis" },
    { name: "penerbit", label: "Penerbit", type: "text", placeholder: "Nama penerbit" },
    { name: "tahun", label: "Tahun Terbit", type: "number", placeholder: "2024", min: 1950, max: 2026 },
    { name: "stok", label: "Jumlah Stok", type: "number", placeholder: "1" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookPlus className="h-5 w-5 text-primary" />
          Tambah Koleksi Buku Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                value={bookForm[field.name]}
                onChange={(e) => onBookFormChange({ ...bookForm, [field.name]: e.target.value })}
                required
              />
            </div>
          ))}
          <div className="md:col-span-5 flex justify-end pt-2">
            <Button type="submit">
              <BookPlus className="h-4 w-4" />
              Simpan Buku
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
