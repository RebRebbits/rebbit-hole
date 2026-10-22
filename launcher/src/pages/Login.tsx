import { useState } from 'react'
import { supabase } from '../lib/supabase'
import AuthForm from '../components/AuthForm'

interface LoginProps {
  onNavigate: (page: 'login' | 'signup') => void
  onSuccess: () => void
}

export default function Login({ onNavigate, onSuccess }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      onSuccess()
    }

    setLoading(false)
  }

  return (
    <AuthForm title="Sign in to your account" error={error}>
      <input
        style={styles.input}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
      />
      <button
        style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>

      <p style={styles.switchText}>
        Don't have an account?{' '}
        <span style={styles.link} onClick={() => onNavigate('signup')}>
          Sign up
        </span>
      </p>
    </AuthForm>
  )
}

const styles: Record<string, React.CSSProperties> = {
  input: {
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-main)',
    marginBottom: '10px',
    outline: 'none',
  },
  button: {
    width: '100%',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-accent-text)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: '11px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'var(--font-main)',
    cursor: 'pointer',
    marginTop: '4px',
  },
  switchText: {
    textAlign: 'center',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    marginTop: '1rem',
    marginBottom: 0,
    fontFamily: 'var(--font-main)',
  },
  link: {
    color: 'var(--color-accent)',
    cursor: 'pointer',
    fontWeight: 500,
  },
}
