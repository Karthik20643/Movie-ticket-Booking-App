import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
  import { ClerkProvider } from '@clerk/clerk-react'

import { BrowserRouter } from 'react-router-dom'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ''

const rootEl = document.getElementById('root')
const appNode = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

if (PUBLISHABLE_KEY) {
  createRoot(rootEl).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {appNode}
    </ClerkProvider>,
  )
} else {
  console.warn('VITE_CLERK_PUBLISHABLE_KEY not set — rendering without ClerkProvider (dev only).')
  createRoot(rootEl).render(appNode)
}
