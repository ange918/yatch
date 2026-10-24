import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index.js'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

window.addEventListener('error', (e) => {
  if (
    e.message?.includes('removeChild') ||
    e.message?.includes('NotFoundError') ||
    e.message?.includes('Node')
  ) {
    e.stopImmediatePropagation()
    e.preventDefault()
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
