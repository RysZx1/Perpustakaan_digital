import { useState, useEffect, useCallback } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Lenis from "lenis"
import Navbar from "./components/layout/Navbar"
import LandingPage from "./pages/LandingPage"
import DashboardPage from "./pages/DashboardPage"
import AuthModal from "./components/AuthModal"
import { Toaster } from "./components/ui/sonner"
import { toast } from "sonner"

const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:5000/api")

function AppContent() {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [borrows, setBorrows] = useState([])
  const [token, setToken] = useState(sessionStorage.getItem("token") || "")
  const [user, setUser] = useState({ nama: "", role: "" })
  const [authOpen, setAuthOpen] = useState(false)

  const showToast = (message, type = "info") => {
    if (type === "success") toast.success(message)
    else if (type === "error") toast.error(message)
    else toast(message)
  }

  const logout = useCallback((isForced = false, isSessionExpired = false) => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userName")
    setToken("")
    setUser({ nama: "", role: "" })
    setBorrows([])
    if (isSessionExpired) {
      showToast("Sesi login Anda telah berakhir. Silakan login kembali.", "error")
    } else if (!isForced) {
      showToast("Berhasil keluar", "info")
    }
  }, [])

  const decodeAndSetUser = useCallback((jwtToken) => {
    try {
      const base64Url = jwtToken.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const payload = JSON.parse(window.atob(base64))

      if (payload.exp && payload.exp * 1000 < Date.now()) {
        logout(true, true)
        navigate("/")
        return false
      }

      setUser({
        nama: payload.nama || sessionStorage.getItem("userName") || "User",
        role: payload.role || "anggota"
      })
      return true
    } catch {
      logout(true, true)
      navigate("/")
      return false
    }
  }, [logout, navigate])

  const loadBooks = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/books`)
      const result = await res.json()
      if (res.ok) {
        const data = result.data || result
        setBooks(Array.isArray(data) ? data : [])
      } else {
        setBooks([])
      }
    } catch {
      setBooks([])
      showToast("Gagal memuat data buku", "error")
    }
  }, [])

  const loadBorrowHistory = useCallback(async (jwtToken) => {
    try {
      const res = await fetch(`${BASE_URL}/borrows`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      const result = await res.json()
      if (res.ok) {
        const data = result.data || result
        setBorrows(Array.isArray(data) ? data : [])
      } else {
        setBorrows([])
        if (res.status === 401 || res.status === 403) {
          logout(true, true)
          navigate("/")
        }
      }
    } catch {
      setBorrows([])
      showToast("Gagal memuat riwayat pinjaman", "error")
    }
  }, [logout, navigate])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Session expiration timer — schedules auto-logout when JWT expires
  useEffect(() => {
    if (!token) return

    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const payload = JSON.parse(window.atob(base64))

      if (!payload.exp) return

      const msUntilExpiry = payload.exp * 1000 - Date.now()

      if (msUntilExpiry <= 0) {
        // Already expired
        logout(true, true)
        navigate("/")
        return
      }

      // Show a warning toast 5 minutes before expiry
      const WARNING_MS = 5 * 60 * 1000
      let warningTimer
      if (msUntilExpiry > WARNING_MS) {
        warningTimer = setTimeout(() => {
          showToast("Sesi Anda akan berakhir dalam 5 menit. Silakan simpan pekerjaan Anda.", "info")
        }, msUntilExpiry - WARNING_MS)
      }

      // Auto-logout when token expires
      const expiryTimer = setTimeout(() => {
        logout(true, true)
        navigate("/")
      }, msUntilExpiry)

      return () => {
        clearTimeout(expiryTimer)
        if (warningTimer) clearTimeout(warningTimer)
      }
    } catch {
      // Invalid token, force logout
      logout(true, true)
      navigate("/")
    }
  }, [token, logout, navigate])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadBooks()
    if (token) {
      const isValid = decodeAndSetUser(token)
      if (isValid) {
        loadBorrowHistory(token)
      }
    }
  }, [token, loadBooks, decodeAndSetUser, loadBorrowHistory])
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const result = await res.json()
      if (res.ok) {
        sessionStorage.setItem("token", result.token)
        if (result.user?.nama) {
          sessionStorage.setItem("userName", result.user.nama)
        }
        setToken(result.token)
        setAuthOpen(false)
        showToast(`Selamat datang, ${result.user?.nama || "Admin"}!`, "success")
        navigate("/dashboard")
      } else {
        showToast(result.message || "Login gagal!", "error")
      }
    } catch {
      showToast("Koneksi ke server terputus", "error")
    }
  }

  const handleRegister = async (nama, email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, password, role: "anggota" }),
      })
      const result = await res.json()
      if (res.ok) {
        showToast("Akun berhasil dibuat! Silakan masuk.", "success")
      } else {
        showToast(result.message || "Gagal mendaftar!", "error")
      }
    } catch {
      showToast("Gagal memproses pendaftaran", "error")
    }
  }

  const handleAddBook = async (bookForm) => {
    try {
      const res = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          judul: bookForm.judul,
          penulis: bookForm.penulis,
          penerbit: bookForm.penerbit,
          tahun: parseInt(bookForm.tahun),
          stok: parseInt(bookForm.stok),
        }),
      })
      if (res.ok) {
        showToast("Buku berhasil ditambahkan!", "success")
        loadBooks()
      } else {
        const errData = await res.json()
        showToast(errData.message || "Gagal tambah buku", "error")
        if (res.status === 401 || res.status === 403) logout()
      }
    } catch {
      showToast("Gagal menambahkan buku", "error")
    }
  }

  const handleEditBook = async (bookId, bookData) => {
    try {
      const res = await fetch(`${BASE_URL}/books/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          judul: bookData.judul,
          penulis: bookData.penulis,
          penerbit: bookData.penerbit,
          tahun_terbit: parseInt(bookData.tahun),
          stok: parseInt(bookData.stok),
        }),
      })
      if (res.ok) {
        showToast("Buku berhasil diperbarui!", "success")
        loadBooks()
      } else {
        const errData = await res.json()
        showToast(errData.message || "Gagal memperbarui buku", "error")
        if (res.status === 401 || res.status === 403) logout()
      }
    } catch {
      showToast("Gagal memperbarui buku", "error")
    }
  }

  const handleDeleteBook = async (bookId) => {
    try {
      const res = await fetch(`${BASE_URL}/books/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        showToast("Buku berhasil dihapus!", "success")
        loadBooks()
      } else {
        const errData = await res.json()
        showToast(errData.message || "Gagal menghapus buku", "error")
        if (res.status === 401 || res.status === 403) logout()
      }
    } catch {
      showToast("Gagal menghapus buku", "error")
    }
  }

  const kembalikanBuku = async (borrowId) => {
    try {
      const res = await fetch(`${BASE_URL}/borrows/${borrowId}/kembalikan`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        showToast("Buku berhasil dikembalikan!", "success")
        loadBooks()
        loadBorrowHistory(token)
      } else {
        const errData = await res.json()
        showToast(errData.message || "Gagal mengembalikan buku", "error")
        if (res.status === 401 || res.status === 403) logout()
      }
    } catch {
      showToast("Gagal memproses pengembalian", "error")
    }
  }

  const pinjamBuku = async (bookId) => {
    if (!token) {
      showToast("Silakan login terlebih dahulu!", "error")
      setAuthOpen(true)
      return
    }
    try {
      const res = await fetch(`${BASE_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ BookId: bookId }),
      })
      if (res.ok) {
        showToast("Buku berhasil dipinjam!", "success")
        loadBooks()
        loadBorrowHistory(token)
      } else {
        const errData = await res.json()
        showToast(errData.message || "Gagal meminjam buku", "error")
        if (res.status === 401 || res.status === 403) logout()
      }
    } catch {
      showToast("Gagal memproses peminjaman", "error")
    }
  }

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard")
    } else {
      setAuthOpen(true)
    }
  }

  return (
    <div className="min-h-dvh bg-background">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar
                token={token}
                user={user}
                onLoginClick={() => setAuthOpen(true)}
                onLogout={logout}
              />
              <LandingPage
                onGetStarted={handleGetStarted}
                books={books}
                onPinjam={pinjamBuku}
                onRefresh={loadBooks}
              />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              token={token}
              user={user}
              books={books}
              borrows={borrows}
              onLogout={logout}
              onPinjam={pinjamBuku}
              onReturn={kembalikanBuku}
              onAddBook={handleAddBook}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
              onRefresh={loadBooks}
            />
          }
        />
      </Routes>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <Toaster position="top-right" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
