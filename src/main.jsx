import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

const root = document.getElementById('root')

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// A production build is prerendered (scripts/prerender.js), so #root already
// holds real markup and we attach to it instead of throwing it away. `npm run
// dev` serves the bare shell, where hydrateRoot would warn about a mismatch --
// hence the check rather than a hardcoded choice.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
