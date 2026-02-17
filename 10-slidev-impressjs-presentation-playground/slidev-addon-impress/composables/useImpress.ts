import { computed, ref, reactive } from 'vue'

export interface ImpressConfig {
  enabled: boolean
  width: number
  height: number
  perspective: number
  transitionDuration: number
  maxScale: number
  minScale: number
  background: string
}

export interface ImpressStep {
  translate: { x: number; y: number; z: number }
  rotate: { x: number; y: number; z: number; order: string }
  scale: number
  transitionDuration: number | null
  cssClass: string
}

export interface CameraState {
  translate: { x: number; y: number; z: number }
  rotate: { x: number; y: number; z: number; order: string }
  scale: number
}

export function parseImpressConfig(frontmatter: Record<string, any>): ImpressConfig {
  return {
    enabled: frontmatter.impressEnabled === true,
    width: frontmatter.impressWidth ?? 1024,
    height: frontmatter.impressHeight ?? 768,
    perspective: frontmatter.impressPerspective ?? 1000,
    transitionDuration: frontmatter.impressTransitionDuration ?? 1000,
    maxScale: frontmatter.impressMaxScale ?? 3,
    minScale: frontmatter.impressMinScale ?? 0,
    background: frontmatter.impressBackground ?? 'radial-gradient(rgb(240,240,240), rgb(190,190,190))',
  }
}

export function parseStepData(frontmatter: Record<string, any>): ImpressStep {
  return {
    translate: {
      x: frontmatter.impressX ?? 0,
      y: frontmatter.impressY ?? 0,
      z: frontmatter.impressZ ?? 0,
    },
    rotate: {
      x: frontmatter.impressRotateX ?? 0,
      y: frontmatter.impressRotateY ?? 0,
      z: frontmatter.impressRotate ?? frontmatter.impressRotateZ ?? 0,
      order: frontmatter.impressRotateOrder ?? 'xyz',
    },
    scale: frontmatter.impressScale ?? 1,
    transitionDuration: frontmatter.impressTransitionDuration ?? null,
    cssClass: frontmatter.impressClass ?? '',
  }
}

export function buildRotateCSS(
  r: { x: number; y: number; z: number; order: string },
  revert = false,
): string {
  let axes = r.order.split('')
  if (revert) axes = axes.reverse()
  return axes
    .map(a => {
      const val = r[a as 'x' | 'y' | 'z']
      return `rotate${a.toUpperCase()}(${val}deg)`
    })
    .join(' ')
}

export function computeWindowScale(config: ImpressConfig): number {
  const hScale = window.innerHeight / config.height
  const wScale = window.innerWidth / config.width
  const scale = Math.min(hScale, wScale)
  if (config.maxScale && scale > config.maxScale) return config.maxScale
  if (config.minScale && scale < config.minScale) return config.minScale
  return scale
}
