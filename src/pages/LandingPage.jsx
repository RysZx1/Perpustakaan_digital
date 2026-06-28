import { BookOpen, Users, BookMarked, Search, ArrowRight, Shield, BarChart3 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Footer from "../components/layout/Footer"
import BookCatalog from "../components/BookCatalog"

const features = [
  {
    icon: Search,
    title: "Cari Buku Mudah",
    desc: "Temukan buku yang Anda butuhkan dengan pencarian cepat dan filter lengkap.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookMarked,
    title: "Pinjam Online",
    desc: "Pinjam buku kapan saja secara online tanpa perlu datang ke perpustakaan.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Manajemen Anggota",
    desc: "Kelola data anggota perpustakaan dengan sistem yang terintegrasi.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Laporan & Statistik",
    desc: "Pantau aktivitas perpustakaan dengan laporan dan statistik real-time.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    desc: "Data anggota dan transaksi diamankan dengan sistem autentikasi JWT.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BookOpen,
    title: "Koleksi Digital",
    desc: "Akses katalog buku digital kapan saja dan di mana saja.",
    color: "from-sky-500 to-indigo-500",
  },
]

const stats = [
  { label: "Total Buku", value: "120+" },
  { label: "Anggota Aktif", value: "50+" },
  { label: "Peminjaman", value: "200+" },
  { label: "Tahun", value: "2025" },
]

export default function LandingPage({ onGetStarted, books = [], onPinjam, onRefresh }) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-amber-50/50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl" />

        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-xs font-medium">
              Platform Perpustakaan Digital Kelompok 2
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
                Perpustakaan Digital
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Platform manajemen perpustakaan modern untuk memudahkan peminjaman buku,
              pengelolaan koleksi, dan monitoring aktivitas perpustakaan secara real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={onGetStarted} className="text-base">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Fitur Unggulan</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Berbagai fitur untuk memudahkan pengelolaan perpustakaan digital Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-5 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Katalog */}
      <section id="katalog" className="container py-20 border-t bg-muted/10">
        <BookCatalog books={books} onPinjam={onPinjam} onRefresh={onRefresh} />
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-violet-700">
        <div className="container py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Mengelola Perpustakaan Digital?
          </h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
            Bergabung sekarang dan nikmati kemudahan mengelola perpustakaan secara digital.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={onGetStarted}
            className="text-base"
          >
            Mulai Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
