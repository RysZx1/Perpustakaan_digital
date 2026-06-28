import { BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-bold">Perpustakaan Digital</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Platform perpustakaan digital untuk memudahkan peminjaman dan pengelolaan buku.
              Dibangun oleh Kelompok 2 sebagai proyek UAS.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Navigasi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Beranda</li>
              <li>Katalog Buku</li>
              <li>Tentang</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Kontak</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Kelompok 2</li>
              <li>UAS Perpustakaan Digital</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Kelompok 2 - Perpustakaan Digital. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
