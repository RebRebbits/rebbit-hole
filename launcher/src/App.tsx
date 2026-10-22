import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Library from './pages/Library'
import Placeholder from './pages/Placeholder'
import Sidebar, { type NavPage } from './components/Sidebar'
import type { Session } from '@supabase/supabase-js'

type AuthPage = 'login' | 'signup'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [authPage, setAuthPage] = useState<AuthPage>('login')
  const [navPage, setNavPage] = useState<NavPage>('library')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    )
  }

  if (!session) {
    if (authPage === 'signup') return <SignUp onNavigate={setAuthPage} />
    return <Login onNavigate={setAuthPage} onSuccess={() => {}} />
  }

  const renderPage = () => {
    switch (navPage) {
      case 'library':  return <Library />
      case 'rewards':  return <Placeholder title="Rewards" description="Cross-game rewards and achievements coming soon." />
      case 'ranks':    return <Placeholder title="Ranks" description="Player rankings coming soon." />
      case 'activity': return <Placeholder title="Activity" description="Your activity log and stats coming soon." />
      case 'news':     return <Placeholder title="News" description="Studio news and announcements coming soon." />
      case 'forums':   return <Placeholder title="Forums" description="Community forums coming soon." />
      case 'settings': return <Placeholder title="Settings" description="Launcher settings coming soon." />
    }
  }

  return (
    <div style={styles.launcher}>
      <Sidebar
        session={session}
        activePage={navPage}
        onNavigate={setNavPage}
        onSignOut={() => supabase.auth.signOut()}
      />
      {renderPage()}
    </div>
  )
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
  launcher: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'var(--color-bg)',
  },
}
