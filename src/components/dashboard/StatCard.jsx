import { Card } from "../ui/card"

const gradients = {
  blue: "from-blue-500 to-cyan-500",
  violet: "from-violet-500 to-purple-600",
  amber: "from-amber-500 to-orange-500",
  emerald: "from-emerald-500 to-teal-500",
  pink: "from-pink-500 to-rose-500",
}

export default function StatCard({ title, value, icon: Icon, color = "blue" }) {
  return (
    <Card className="overflow-hidden shadow-sm border-0">
      <div className={`bg-gradient-to-r ${gradients[color]} px-5 py-4`}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/80">{title}</p>
          <Icon className="h-5 w-5 text-white/60" />
        </div>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>
    </Card>
  )
}
