import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { Writable } from 'node:stream'
import App from './App'
import './index.css'

/**
 * Server entry, used only by scripts/prerender.js at build time. Nothing here
 * ships to the browser.
 *
 * Why renderToPipeableStream and not the simpler renderToString: App.jsx code-
 * splits every route behind React.lazy. renderToString gives up at the first
 * suspended boundary and emits the Suspense fallback, which for this app is an
 * empty div -- i.e. it would "successfully" prerender a blank page for every
 * route except Home. onAllReady waits for the lazy chunks to resolve, so what
 * lands in the HTML is the real page.
 */
export function render(url) {
  return new Promise((resolve, reject) => {
    const helmetContext = {}
    let html = ''

    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString('utf8')
        cb()
      },
    })
    sink.on('finish', () => resolve({ html, helmet: helmetContext.helmet }))

    // StrictMode is deliberately omitted: it double-renders, which costs build
    // time and buys nothing without effects. The browser entry keeps it.
    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>,
      {
        // Fires once every Suspense boundary has resolved.
        onAllReady() {
          pipe(sink)
        },
        onError(err) {
          reject(err)
        },
      },
    )

    // A route that never settles would otherwise hang the build forever.
    setTimeout(() => {
      abort()
      reject(new Error(`Prerender timed out after 20s: ${url}`))
    }, 20_000).unref?.()
  })
}
