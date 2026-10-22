interface PlaceholderProps {
  title: string
  description?: string
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.content}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.desc}>
          {description ?? 'This section is coming soon.'}
        </p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg)',
  },
  content: {
    textAlign: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: '0 0 8px',
    fontFamily: 'var(--font-main)',
  },
  desc: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    margin: 0,
    fontFamily: 'var(--font-main)',
  },
}
