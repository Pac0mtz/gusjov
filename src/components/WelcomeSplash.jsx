import { useLayoutEffect, useState } from 'react'
import { site } from '../data/site'

const SESSION_KEY = 'gusjov-welcome-seen'

/**
 * Client-only welcome veil (skipped on SSR / reduced motion / return visits).
 * useLayoutEffect shows it before the first paint to avoid a content flash.
 */
export default function WelcomeSplash() {
  const [phase, setPhase] = useState('idle') // idle | show | exit | done

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setPhase('done')
        return
      }
    } catch {
      /* private mode */
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* ignore */
      }
      setPhase('done')
      return
    }

    setPhase('show')
    document.documentElement.classList.add('welcome-lock')

    const exitTimer = window.setTimeout(() => setPhase('exit'), 2100)
    const doneTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* ignore */
      }
      document.documentElement.classList.remove('welcome-lock')
      setPhase('done')
    }, 2900)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
      document.documentElement.classList.remove('welcome-lock')
    }
  }, [])

  if (phase === 'idle' || phase === 'done') return null

  return (
    <div
      className={`welcome-splash ${phase === 'exit' ? 'is-exiting' : ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="welcome-splash__glow" />
      <div className="welcome-splash__vignette" />

      <div className="welcome-splash__stage">
        <div className="welcome-splash__mark">
          <img
            src={site.logo}
            alt=""
            width="88"
            height="88"
            className="welcome-splash__logo"
            decoding="async"
          />
          <span className="welcome-splash__ring" />
        </div>

        <p className="welcome-splash__brand">
          Gusjov <span>Flooring</span>
        </p>
        <span className="welcome-splash__rule" />
        <p className="welcome-splash__tag">{site.tagline}</p>
      </div>
    </div>
  )
}
