import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './base.css' // Base Tailwind CSS (compiled at build time)
// Theme-specific CSS is loaded dynamically by ThemeProvider
import App from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
