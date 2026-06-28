import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const colorMap = {
  blue:    { icon: "bg-blue-100 text-blue-600",   val: "text-blue-700" },
  emerald: { icon: "bg-emerald-100 text-emerald-600", val: "text-emerald-700" },
  amber:   { icon: "bg-amber-100 text-amber-600", val: "text-amber-700" },
  violet:  { icon: "bg-violet-100 text-violet-600",val: "text-violet-700" },
  pink:    { icon: "bg-rose-100 text-rose-600",   val: "text-rose-700" },
}

export default function StatCard({ title, value, icon: Icon, color = "blue" }) {
  const c = colorMap[color] || colorMap.blue
  return (
    <Card className="border-white/60 shadow-xl shadow-slate-200/40 bg-white/50 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        <div className={`p-2 rounded-xl ${c.icon}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold tabular-nums ${c.val}`}>{value}</div>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
          <TrendingUp className="h-3 w-3 text-emerald-500" />
          <span className="text-emerald-600 font-semibold">+12%</span> dari bulan lalu
        </p>
      </CardContent>
    </Card>
  )
}
