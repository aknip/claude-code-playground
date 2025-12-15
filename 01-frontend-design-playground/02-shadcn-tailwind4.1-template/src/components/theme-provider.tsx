import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Dynamically import all theme CSS files matching the pattern
const themeModules = import.meta.glob<string>("@/index.css-*.css", {
  query: "?raw",
  import: "default",
  eager: true,
})

// Extract theme names from file paths and build themes array
const themes = Object.entries(themeModules).map(([path, css]) => {
  // Extract theme name from path: "/src/index.css-colored.css" -> "colored"
  const match = path.match(/index\.css-(.+)\.css$/)
  const name = match ? match[1] : path
  return { name, css }
})

// Sort themes alphabetically by name for consistent ordering
themes.sort((a, b) => a.name.localeCompare(b.name))

interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
  cycleTheme: () => void
  themes: typeof themes
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: string
  storageKey?: string
}

const STYLE_ID = "theme-style"

export function ThemeProvider({
  children,
  defaultTheme,
  storageKey = "app-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey)
      if (stored && themes.find((t) => t.name === stored)) {
        return stored
      }
    }
    // Use provided default, "default" theme, or first available theme
    if (defaultTheme && themes.find((t) => t.name === defaultTheme)) {
      return defaultTheme
    }
    const defaultThemeConfig = themes.find((t) => t.name === "default")
    return defaultThemeConfig?.name ?? themes[0]?.name ?? ""
  })

  const themeConfig = themes.find((t) => t.name === theme) || themes[0]

  useEffect(() => {
    if (!themeConfig) return

    // Find or create the style element
    let styleElement = document.getElementById(STYLE_ID) as HTMLStyleElement | null
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = STYLE_ID
      document.head.appendChild(styleElement)
    }

    // Replace the entire CSS content
    styleElement.textContent = themeConfig.css

    // Store the theme preference
    localStorage.setItem(storageKey, theme)
  }, [theme, themeConfig, storageKey])

  const setTheme = (newTheme: string) => {
    if (themes.find((t) => t.name === newTheme)) {
      setThemeState(newTheme)
    }
  }

  const cycleTheme = () => {
    const currentIndex = themes.findIndex((t) => t.name === theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setThemeState(themes[nextIndex].name)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
