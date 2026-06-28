import { AlertTriangle, BookOpen, Undo2, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { Button } from "./button"

const icons = {
  borrow: BookOpen,
  return: Undo2,
  danger: AlertTriangle,
}

const variants = {
  borrow: {
    confirm: "bg-primary hover:bg-primary/90 text-primary-foreground",
    icon: "text-primary",
  },
  return: {
    confirm: "bg-emerald-600 hover:bg-emerald-700 text-white",
    icon: "text-emerald-600",
  },
  danger: {
    confirm: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
    icon: "text-destructive",
  },
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  variant = "borrow",
  loading = false,
  onConfirm,
}) {
  const Icon = icons[variant] || icons.borrow
  const styles = variants[variant] || variants.borrow

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-background border ${styles.icon}`}>
              <Icon className="h-5 w-5" />
            </div>
            <DialogTitle className="text-lg">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            className={styles.confirm}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
