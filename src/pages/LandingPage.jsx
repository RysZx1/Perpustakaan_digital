import { useRef, useEffect } from "react"
import { BookOpen, Users, BookMarked, Search, ArrowRight, Shield, BarChart3, LayoutGrid } from "lucide-react"
import { Button } from "../components/ui/button"
import Footer from "../components/layout/Footer"
import BookCatalog from "../components/BookCatalog"
import { motion, useInView } from "motion/react"

// Spotlight: track mouse position per card
function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
      el.style.setProperty("--my", `${e.clientY - rect.top}px`)
    }
    el.addEventListener("mousemove", move)
    return () => el.removeEventListener("mousemove", move)
  }, [ref])
}

const features = [
  {
    icon: Search,
    title: "Instant Search",
    desc: "Temukan buku dalam hitungan detik dengan sistem pencarian terindeks kami yang super cepat.",
  },
  {
    icon: BookMarked,
    title: "Digital Borrowing",
    desc: "Proses peminjaman buku yang sepenuhnya online tanpa perlu datang fisik ke perpustakaan.",
  },
  {
    icon: Users,
    title: "Member Management",
    desc: "Kelola anggota, pantau aktivitas peminjaman, dan berikan akses yang tepat dengan mudah.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Dapatkan wawasan mendalam dengan dashboard statistik yang selalu ter-update secara real-time.",
  },
  {
    icon: Shield,
    title: "Secure Architecture",
    desc: "Infrastruktur aman dengan enkripsi tingkat lanjut untuk melindungi data privasi pengguna.",
  },
  {
    icon: LayoutGrid,
    title: "Bento Grid Layout",
    desc: "Antarmuka modern berbasis blok yang dirancang untuk pengalaman pengguna terbaik di semua perangkat.",
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  useSpotlight(ref)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.2 }}
      className="spotlight-card bg-white/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 card-lift cursor-default border border-white/60 shadow-xl shadow-slate-200/40"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 mb-5 text-slate-700">
          <feature.icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-base mb-2 text-foreground">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{feature.desc}</p>
      </div>
    </motion.div>
  )
}

export default function LandingPage({ onGetStarted, books = [], onPinjam, onRefresh }) {
  const catalogRef = useRef(null)
  const catalogInView = useInView(catalogRef, { once: true, margin: "-50px" })
  
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" })

  return (
    <div className="min-h-dvh flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* ── Hero Section (Minimalist SaaS) ── */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden flex-1 flex flex-col justify-center min-h-[80vh]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
        
        {/* Animated Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.2, rotate: 20, opacity: 1, filter: "drop-shadow(0px 0px 8px rgba(99,102,241,0.5))" }}
            className="absolute top-[15%] left-[10%] text-primary/20 pointer-events-auto cursor-pointer"
          >
            <BookOpen className="h-20 w-20" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 40, 0], rotate: [0, -15, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            whileHover={{ scale: 1.2, rotate: -20, opacity: 1, filter: "drop-shadow(0px 0px 8px rgba(148,163,184,0.5))" }}
            className="absolute top-[60%] left-[15%] text-slate-300/40 pointer-events-auto cursor-pointer"
          >
            <BookMarked className="h-16 w-16" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            whileHover={{ scale: 1.2, rotate: 15, opacity: 1, filter: "drop-shadow(0px 0px 8px rgba(16,185,129,0.5))" }}
            className="absolute top-[20%] right-[10%] text-emerald-500/20 pointer-events-auto cursor-pointer"
          >
            <BookOpen className="h-24 w-24" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -10, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            whileHover={{ scale: 1.2, rotate: -15, opacity: 1, filter: "drop-shadow(0px 0px 8px rgba(245,158,11,0.5))" }}
            className="absolute top-[65%] right-[15%] text-amber-500/20 pointer-events-auto cursor-pointer"
          >
            <BookMarked className="h-20 w-20" />
          </motion.div>
        </div>
        
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm text-xs font-medium tracking-wide text-slate-600 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Perpustakaan Digital v2.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", bounce: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter text-slate-900 leading-[1.1]"
          >
            Kelola Perpustakaan<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-primary to-slate-500">
              Lebih Cerdas & Cepat
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Platform perpustakaan digital modern dengan antarmuka elegan, fitur peminjaman online, dan dashboard analitik real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", bounce: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="h-12 px-8 text-base font-semibold shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200 rounded-xl group"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" })}
              className="h-12 px-8 text-base font-medium rounded-xl border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Jelajahi Katalog
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee strip (Sleek monochrome) ── */}
      <div className="border-y border-slate-200 bg-slate-50 py-3 overflow-hidden">
        <div className="marquee-track flex gap-8 md:gap-16 items-center px-4">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex gap-8 md:gap-16 whitespace-nowrap">
              {["Modern Interface", "Real-time Analytics", "Secure Data", "Fast Search", "Seamless UX", "Cloud Native"].map((item, i) => (
                <span key={`${j}-${i}`} className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-widest">
                  <span className="h-1 w-1 bg-slate-300 rounded-full" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Features Bento Grid ── */}
      <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Ambient background blob for glassmorphism */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        
        <div className="container max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Infrastruktur Modern
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
              Dibangun dengan teknologi terbaru untuk memberikan pengalaman pengguna yang secepat kilat dan aman.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Katalog ── */}
      <section id="katalog" className="py-24 bg-slate-50/50 border-t border-slate-100 relative">
        <div className="container max-w-6xl">
          <motion.div
            ref={catalogRef}
            initial={{ opacity: 0, y: 30 }}
            animate={catalogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Katalog Buku</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Jelajahi koleksi buku kami. Pinjam secara online dan baca kapan saja.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={catalogInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BookCatalog books={books} onPinjam={onPinjam} onRefresh={onRefresh} />
          </motion.div>
        </div>
      </section>

      {/* ── CTA (Sleek Dark) ── */}
      <section className="bg-slate-900 border-t border-slate-800">
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          className="container max-w-4xl py-24 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Siap untuk memulai?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Bergabung sekarang dan kelola perpustakaan Anda dengan platform yang modern dan efisien.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="h-12 px-8 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-transform duration-200 rounded-xl"
          >
            Mulai Sekarang
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

