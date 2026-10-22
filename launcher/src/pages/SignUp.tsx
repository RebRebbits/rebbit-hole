import { useState } from 'react'
import { supabase } from '../lib/supabase'
import AuthForm from '../components/AuthForm'

interface SignUpProps {
  onNavigate: (page: 'login' | 'signup') => void
}

export default function SignUp({ onNavigate }: SignUpProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleSignUp = async () => {
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      setDone(true)
    }

    setLoading(false)
  }

  if (done) {
    return (
      <AuthForm title="Check your email">
        <p style={styles.doneText}>
          We sent a confirmation link to <strong>{email}</strong>.
          Open it to activate your Rebbit Hole account.
        </p>
        <button style={styles.button} onClick={() => onNavigate('login')}>
          Back to sign in
        </button>
      </AuthForm>
    )
  }

  return (
    <AuthForm
      title="Create your account"
      subtitle="One account for all Rebbit Hole games."
      error={error}
    >
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
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
      />
      <button
        style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
        onClick={handleSignUp}
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>

      <p style={styles.switchText}>
        Already have an account?{' '}
        <span style={styles.link} onClick={() => onNavigate('login')}>
          Sign in
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
  doneText: {
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    lineHeight: 1.6,
    marginTop: 0,
    marginBottom: '1.25rem',
    fontFamily: 'var(--font-main)',
  },
}
