import { defineAppSetup } from '@slidev/types'

const GRADIENT_STOPS = [
  [0x00, 0xA8, 0xFF], // #00A8FF
  [0x2E, 0x3B, 0xFF], // #2E3BFF
  [0x59, 0x00, 0xFF], // #5900FF
  [0x83, 0x00, 0xFF], // #8300FF
  [0xBC, 0x00, 0xFF], // #BC00FF
  [0xE6, 0x00, 0xDE], // #E600DE
  [0xFF, 0x08, 0xA1], // #FF08A1
  [0xFF, 0x38, 0x52], // #FF3852
  [0xFF, 0x5A, 0x19], // #FF5A19
  [0xFF, 0x83, 0x00], // #FF8300
  [0xFF, 0xC4, 0x00], // #FFC400
]

function interpolateGradient(t: number): string {
  const clamped = Math.max(0, Math.min(1, t))
  const segment = clamped * (GRADIENT_STOPS.length - 1)
  const i = Math.min(Math.floor(segment), GRADIENT_STOPS.length - 2)
  const f = segment - i

  const [r1, g1, b1] = GRADIENT_STOPS[i]
  const [r2, g2, b2] = GRADIENT_STOPS[i + 1]

  const r = Math.round(r1 + (r2 - r1) * f)
  const g = Math.round(g1 + (g2 - g1) * f)
  const b = Math.round(b1 + (b2 - b1) * f)

  return `rgb(${r}, ${g}, ${b})`
}

function applyGradientColors() {
  const pages = document.querySelectorAll('.slidev-page')
  if (pages.length === 0) return

  pages.forEach((page, index) => {
    const t = pages.length === 1 ? 0 : index / (pages.length - 1)
    ;(page as HTMLElement).style.setProperty('--ia-slide-bg', interpolateGradient(t))
  })
}

export default defineAppSetup(({ router }) => {
  if (typeof window === 'undefined') return

  router.isReady().then(() => {
    // Initial application after a short delay to let slides render
    setTimeout(applyGradientColors, 100)

    // Watch for slide DOM changes (add/remove/reorder)
    const observer = new MutationObserver(() => {
      applyGradientColors()
    })

    const startObserving = () => {
      const container = document.querySelector('#slide-content') || document.body
      observer.observe(container, { childList: true, subtree: true })
    }

    startObserving()
  })

  // Vite HMR: re-apply when modules update
  if (import.meta.hot) {
    import.meta.hot.on('vite:afterUpdate', () => {
      setTimeout(applyGradientColors, 200)
    })
  }
})
