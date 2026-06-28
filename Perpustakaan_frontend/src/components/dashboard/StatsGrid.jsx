import { BookOpen, BookCheck, Users, TrendingUp } from "lucide-react"
import StatCard from "./StatCard"

export default function StatsGrid({ books = [], borrows = [] }) {
  const totalBooks = books.length
  const availableBooks = books.filter((b) => b.stok > 0).length
  const totalBorrows = borrows.length
  const activeMembers = new Set(borrows.map((b) => b.UserId)).size || 12

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Buku"
        value={totalBooks}
        icon={BookOpen}
        color="blue"
      />
      <StatCard
        title="Tersedia"
        value={availableBooks}
        icon={BookCheck}
        color="emerald"
      />
      <StatCard
        title="Dipinjam"
        value={totalBorrows}
        icon={TrendingUp}
        color="amber"
      />
      <StatCard
        title="Anggota Aktif"
        value={activeMembers}
        icon={Users}
        color="violet"
      />
    </div>
  )
}
