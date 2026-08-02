import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const PRELOAD_RELOAD_KEY = 'mathAdventurePreloadReload'
window.addEventListener('vite:preloadError', () => {
  const lastReload = Number(sessionStorage.getItem(PRELOAD_RELOAD_KEY))
  if (Date.now() - lastReload < 10_000) return
  sessionStorage.setItem(PRELOAD_RELOAD_KEY, String(Date.now()))
  window.location.reload()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
