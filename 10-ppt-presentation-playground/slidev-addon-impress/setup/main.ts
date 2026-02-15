import { defineAppSetup } from '@slidev/types'
import '../styles/impress.css'
import {
  type ImpressConfig,
  type ImpressStep,
  type CameraState,
  parseImpressConfig,
  parseStepData,
  buildRotateCSS,
  computeWindowScale,
} from '../composables/useImpress'

export default defineAppSetup(({ app, router }) => {
  if (typeof window === 'undefined') return

  router.isReady().then(() => {
    // Wait for Slidev to render its DOM
    setTimeout(() => waitForSlideshow(), 100)
  })

  // --- State ---
  let config: ImpressConfig
  let stepsData: Map<number, ImpressStep> = new Map()
  let currentCamera: CameraState = {
    translate: { x: 0, y: 0, z: 0 },
    rotate: { x: 0, y: 0, z: 0, order: 'xyz' },
    scale: 1,
  }
  let viewportEl: HTMLElement
  let rootEl: HTMLElement
  let canvasEl: HTMLElement
  let initialized = false

  // --- Wait for #slideshow to appear ---
  function waitForSlideshow() {
    const el = document.querySelector('#slideshow')
    if (el) {
      initImpress(el as HTMLElement)
    } else {
      requestAnimationFrame(waitForSlideshow)
    }
  }

  // --- Read frontmatter from Slidev's internal slide data ---
  function loadSlideData() {
    // Access Slidev's internal slide data via the global __slidev__ object
    const slidev = (window as any).__slidev__
    const slides = slidev?.nav?.slides?.value ?? slidev?.nav?.slides ?? []

    if (slides.length === 0) {
      console.warn('[impress] No slides found in __slidev__')
      return
    }

    // Global config from first slide's frontmatter
    const firstFm = slides[0]?.meta?.slide?.frontmatter ?? slides[0]?.frontmatter ?? {}
    config = parseImpressConfig(firstFm)

    if (!config.enabled) {
      console.log('[impress] impressEnabled is false, skipping')
      return
    }

    // Parse each slide's step data
    stepsData.clear()
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i]
      const fm = slide?.meta?.slide?.frontmatter ?? slide?.frontmatter ?? {}
      stepsData.set(i + 1, parseStepData(fm))
    }

    console.log(`[impress] Loaded ${stepsData.size} steps`)
  }

  // --- Fallback: Read frontmatter from HTML comments in DOM ---
  function getStepDataFromDOM(slideNo: number): ImpressStep {
    if (stepsData.has(slideNo)) {
      return stepsData.get(slideNo)!
    }
    // Default step
    return {
      translate: { x: 0, y: 0, z: 0 },
      rotate: { x: 0, y: 0, z: 0, order: 'xyz' },
      scale: 1,
      transitionDuration: null,
      cssClass: '',
    }
  }

  // --- Init ---
  function initImpress(slideshowEl: HTMLElement) {
    if (initialized) return

    // Skip presenter mode
    if (window.location.pathname.includes('/presenter')) {
      console.log('[impress] Presenter mode detected, skipping')
      return
    }

    loadSlideData()
    if (!config || !config.enabled) return

    initialized = true
    console.log('[impress] Initializing impress mode')

    // 1. Set body classes
    document.body.classList.add('impress-enabled')
    // Mark opaque impress background so CSS can hide slide backgrounds
    if (config.background && config.background !== 'transparent') {
      document.body.classList.add('impress-opaque-bg')
    }

    // 2. Boost Slidev overlay z-index above impress viewport (z-100)
    //    UnoCSS z-modal=z-70, z-nav=z-50 are below the impress viewport
    const overrideStyle = document.createElement('style')
    overrideStyle.textContent = `
      body.impress-enabled .z-70, body.impress-enabled .z-modal { z-index: 200 !important; }
      body.impress-enabled .z-50, body.impress-enabled .z-nav { z-index: 150 !important; }
    `
    document.head.appendChild(overrideStyle)

    // 3. Set CSS variables for step dimensions
    document.documentElement.style.setProperty('--impress-step-width', `${config.width}px`)
    document.documentElement.style.setProperty('--impress-step-height', `${config.height}px`)

    // 4. Create viewport
    viewportEl = document.createElement('div')
    viewportEl.className = 'impress-viewport'
    viewportEl.style.background = config.background

    // 5. Create root
    rootEl = document.createElement('div')
    rootEl.className = 'impress-root'

    // 6. DOM reparenting: move viewport to body so position:fixed
    //    is relative to the browser viewport, not #slide-content
    //    (a parent with transform creates a new containing block for fixed elements)
    document.body.appendChild(viewportEl)
    viewportEl.appendChild(rootEl)
    rootEl.appendChild(slideshowEl)
    canvasEl = slideshowEl

    // 6. Force all slides visible (override Vue's v-show display:none)
    forceAllSlidesVisible()

    // 7. Position all existing slides
    positionAllSteps()

    // 8. Watch for new slides and style changes (Vue v-show re-applies display:none)
    const observer = new MutationObserver((mutations) => {
      let hasNewSlides = false
      for (const m of mutations) {
        if (m.type === 'childList' && m.addedNodes.length) {
          hasNewSlides = true
        }
        // Detect Vue re-applying display:none via v-show
        if (m.type === 'attributes' && m.attributeName === 'style') {
          const el = m.target as HTMLElement
          if (el.hasAttribute('data-slidev-no') && el.style.display === 'none') {
            el.style.display = 'block'
          }
        }
      }
      if (hasNewSlides) {
        forceAllSlidesVisible()
        positionAllSteps()
        observeSlideStyles(canvasEl)
        // Re-apply classes so new slides get future/past/present
        const currentPage = getCurrentPage()
        updateStepClasses(currentPage - 1)
      }
    })
    observer.observe(canvasEl, { childList: true, subtree: false, attributes: true, attributeFilter: ['style'] })

    // Also observe each existing child for style changes
    observeSlideStyles(canvasEl)

    // 9. Compute window scale
    updateWindowScale()
    window.addEventListener('resize', () => {
      updateWindowScale()
      const currentPage = getCurrentPage()
      if (currentPage > 0) {
        gotoStep(currentPage - 1, false)
      }
    })

    // 10. Navigate to initial step
    const initialPage = getCurrentPage()
    gotoStep(initialPage > 0 ? initialPage - 1 : 0, false)

    // 11. Router integration
    router.afterEach((to) => {
      const match = to.path.match(/\/(\d+)/)
      if (match) {
        const page = parseInt(match[1], 10)
        gotoStep(page - 1, true)
      }
    })

    console.log('[impress] Initialization complete')
  }

  // --- Force all slide elements visible (override Vue's v-show) ---
  function forceAllSlidesVisible() {
    if (!canvasEl) return
    const slides = canvasEl.querySelectorAll('[data-slidev-no]')
    slides.forEach(el => {
      const htmlEl = el as HTMLElement
      if (htmlEl.style.display === 'none') {
        htmlEl.style.display = 'block'
      }
    })
  }

  // --- Observe individual slide elements for style changes ---
  let slideStyleObservers: MutationObserver[] = []
  function observeSlideStyles(container: HTMLElement) {
    // Clean up old observers
    slideStyleObservers.forEach(o => o.disconnect())
    slideStyleObservers = []

    const slides = container.querySelectorAll('[data-slidev-no]')
    slides.forEach(el => {
      const obs = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'style') {
            const htmlEl = m.target as HTMLElement
            if (htmlEl.style.display === 'none') {
              htmlEl.style.display = 'block'
            }
          }
        }
      })
      obs.observe(el, { attributes: true, attributeFilter: ['style'] })
      slideStyleObservers.push(obs)
    })
  }

  // --- Get current page from router ---
  function getCurrentPage(): number {
    const match = window.location.pathname.match(/\/(\d+)/)
    if (match) return parseInt(match[1], 10)
    return 1
  }

  // --- Update window scale ---
  function updateWindowScale() {
    if (!config) return
    const scale = computeWindowScale(config)
    document.documentElement.style.setProperty('--impress-window-scale', String(scale))
  }

  // --- Position all steps ---
  function positionAllSteps() {
    if (!canvasEl) return
    const stepElements = canvasEl.querySelectorAll('[data-slidev-no]')
    stepElements.forEach(el => {
      const slideNo = parseInt(el.getAttribute('data-slidev-no')!, 10)
      const step = getStepDataFromDOM(slideNo)
      positionStep(el as HTMLElement, step)
    })
  }

  // --- Position a single step ---
  function positionStep(stepEl: HTMLElement, step: ImpressStep) {
    const t = step.translate
    const rotateStr = buildRotateCSS(step.rotate)

    // Ensure dimensions are set (override Vue scoped styles)
    stepEl.style.width = `${config.width}px`
    stepEl.style.height = `${config.height}px`
    stepEl.style.position = 'absolute'

    stepEl.style.transform = [
      'translate(-50%, -50%)',
      `translate3d(${t.x}px, ${t.y}px, ${t.z}px)`,
      rotateStr,
      `scale(${step.scale})`,
    ].join(' ')

    stepEl.style.transformStyle = 'preserve-3d'

    // Apply CSS class (e.g. "slide" -> "impress-slide")
    if (step.cssClass) {
      step.cssClass.split(' ').forEach(cls => {
        if (cls) stepEl.classList.add(`impress-${cls}`)
      })
    }
  }

  // --- Camera: Go to step ---
  function gotoStep(stepIndex: number, animate: boolean) {
    if (!rootEl || !canvasEl || !config) return

    const slideNo = stepIndex + 1
    const step = getStepDataFromDOM(slideNo)

    // 1. Inverse transformation
    const target: CameraState = {
      translate: {
        x: -step.translate.x,
        y: -step.translate.y,
        z: -step.translate.z,
      },
      rotate: {
        x: -step.rotate.x,
        y: -step.rotate.y,
        z: -step.rotate.z,
        order: step.rotate.order,
      },
      scale: 1 / step.scale,
    }

    // 2. Window scale
    const windowScale = computeWindowScale(config)

    // 3. Final scale
    const targetScale = target.scale * windowScale

    // 4. Zoom direction and timing
    const zoomin = target.scale >= currentCamera.scale
    const duration = animate ? (step.transitionDuration ?? config.transitionDuration) : 0
    const delay = duration / 2

    // 5. Root transform (Scale + Perspective)
    rootEl.style.perspective = `${config.perspective / targetScale}px`
    rootEl.style.transform = `scale(${targetScale})`
    rootEl.style.transitionDuration = `${duration}ms`
    rootEl.style.transitionDelay = `${zoomin ? delay : 0}ms`

    // 6. Canvas transform (Rotate + Translate)
    const rotateStr = buildRotateCSS(target.rotate, true)
    const translateStr = `translate3d(${target.translate.x}px, ${target.translate.y}px, ${target.translate.z}px)`
    canvasEl.style.transform = `${rotateStr} ${translateStr}`
    canvasEl.style.transitionDuration = `${duration}ms`
    canvasEl.style.transitionDelay = `${zoomin ? 0 : delay}ms`

    // 7. Update CSS classes
    updateStepClasses(stepIndex)

    // 8. Update camera state
    currentCamera = target
  }

  // --- Update step CSS classes ---
  function updateStepClasses(activeIndex: number) {
    if (!canvasEl) return
    const steps = canvasEl.querySelectorAll('[data-slidev-no]')

    steps.forEach(el => {
      el.classList.remove('impress-future', 'impress-present', 'impress-past', 'impress-active')
      const slideNo = parseInt(el.getAttribute('data-slidev-no')!, 10)
      const stepIdx = slideNo - 1

      if (stepIdx < activeIndex) {
        el.classList.add('impress-past')
      } else if (stepIdx === activeIndex) {
        el.classList.add('impress-present', 'impress-active')
      } else {
        el.classList.add('impress-future')
      }
    })
  }
})
