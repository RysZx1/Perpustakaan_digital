import { BookOpen, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white font-display text-lg">Perpustakaan Digital</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-slate-500">
              Platform perpustakaan digital modern untuk memudahkan peminjaman dan pengelolaan
              buku. Dibangun oleh Kelompok 2 sebagai proyek UAS.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-300 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Fitur</a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">Katalog Buku</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-300 uppercase tracking-wider">Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li>Kelompok 2</li>
              <li>UAS Perpustakaan Digital</li>
              <li className="text-slate-500">2025</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Kelompok 2 — Perpustakaan Digital. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Dibuat dengan <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> oleh Kelompok 2
          </span>
        </div>
      </div>
    </footer>
  )
}
