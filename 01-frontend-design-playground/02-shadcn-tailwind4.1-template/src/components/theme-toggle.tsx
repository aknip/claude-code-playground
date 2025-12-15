import { Palette } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { cycleTheme } = useTheme()

  return (
    <button
      onClick={cycleTheme}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
        width: "1.5rem",
        height: "1.5rem",
        borderRadius: "50%",
        backgroundColor: "rgba(107, 114, 128, 0.7)",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(107, 114, 128, 0.9)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(107, 114, 128, 0.7)"
      }}
      aria-label="Theme wechseln"
    >
      <Palette style={{ width: "0.625rem", height: "0.625rem" }} />
    </button>
  )
}
