import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import type { Session } from '@supabase/supabase-js'

type Page = 'login' | 'signup'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<Page>('login')

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for login / logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ── Loading state ──────────────────────────────────────────
  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    )
  }

  // ── Logged in ──────────────────────────────────────────────
  if (session) {
    return (
      <div style={styles.launcherWrapper}>
        <div style={styles.launcherCard}>
          <h1 style={styles.launcherTitle}>Rebbit Hole</h1>
          <p style={styles.launcherSub}>
            Welcome, <strong>{session.user.email}</strong> 🐾
          </p>
          <p style={styles.launcherHint}>
            Game library coming soon.
          </p>
          <button
            style={styles.signOutBtn}
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }

  // ── Not logged in ──────────────────────────────────────────
  if (page === 'signup') {
    return <SignUp onNavigate={setPage} />
  }

  return <Login onNavigate={setPage} onSuccess={() => {}} />
}

const styles: Record<string, React.CSSProperties> = {
  loadingWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg)',
  },
  loadingText: {
    color: 'var(--color-text-secondary)',
    fontSize: '14px',
    fontFamily: 'var(--font-main)',
  },
  launcherWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg)',
    padding: '1rem',
  },
  launcherCard: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    boxShadow: '0 4px 24px rgba(45, 59, 42, 0.08)',
  },
  launcherTitle: {
    color: 'var(--color-text-primary)',
    fontSize: '26px',
    fontWeight: 600,
    margin: '0 0 8px',
    fontFamily: 'var(--font-main)',
  },
  launcherSub: {
    color: 'var(--color-text-secondary)',
    fontSize: '14px',
    margin: '0 0 8px',
    fontFamily: 'var(--font-main)',
  },
  launcherHint: {
    color: 'var(--color-text-secondary)',
    fontSize: '13px',
    margin: '0 0 2rem',
    fontFamily: 'var(--font-main)',
  },
  signOutBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-secondary)',
    fontSize: '13px',
    fontFamily: 'var(--font-main)',
    padding: '8px 20px',
    cursor: 'pointer',
  },
}
