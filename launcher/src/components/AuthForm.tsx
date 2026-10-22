import React from 'react'

interface AuthFormProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  error?: string | null
}

export default function AuthForm({ title, subtitle, children, error }: AuthFormProps) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.appName}>Rebbit Hole</h1>
          <p style={styles.subtitle}>{title}</p>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {subtitle && <p style={styles.bodySubtitle}>{subtitle}</p>}

          {/* Error message */}
          {error && <div style={styles.errorBox}>{error}</div>}

          {children}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg)',
    padding: '1rem',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    border: '1px solid var(--color-border)',
    boxShadow: '0 4px 24px rgba(45, 59, 42, 0.08)',
  },
  header: {
    backgroundColor: 'var(--color-header)',
    padding: '1.75rem 2rem',
  },
  appName: {
    color: 'var(--color-text-on-dark)',
    fontSize: '22px',
    fontWeight: 600,
    margin: '0 0 4px',
    fontFamily: 'var(--font-main)',
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    margin: 0,
    fontFamily: 'var(--font-main)',
  },
  body: {
    backgroundColor: 'var(--color-bg)',
    padding: '1.75rem 2rem',
  },
  bodySubtitle: {
    color: 'var(--color-text-secondary)',
    fontSize: '13px',
    marginTop: 0,
    marginBottom: '1.25rem',
    fontFamily: 'var(--font-main)',
  },
  errorBox: {
    backgroundColor: '#FDF0EA',
    border: '1px solid var(--color-terracotta)',
    color: 'var(--color-terracotta)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.65rem 1rem',
    fontSize: '13px',
    marginBottom: '1rem',
    fontFamily: 'var(--font-main)',
  },
}
