import type { Game } from './GameCard'

interface GameDetailProps {
  game: Game | null
}

export default function GameDetail({ game }: GameDetailProps) {
  if (!game) {
    return (
      <div style={styles.panel}>
        <p style={styles.empty}>Select a game to see details.</p>
      </div>
    )
  }

  return (
    <div style={styles.panel}>
      {/* Cover */}
      <div style={{ ...styles.cover, backgroundColor: game.coverColor ?? 'var(--color-sand)' }}>
        <span style={styles.coverText}>cover art</span>
      </div>

      {/* Info */}
      <h2 style={styles.title}>{game.title}</h2>
      <p style={styles.desc}>{game.description}</p>

      {/* Action */}
      <button
        style={{
          ...styles.btn,
          ...(game.status === 'installed' ? styles.btnPlay : styles.btnInstall),
        }}
        onClick={() => {
          // TODO: wire up play / install logic
        }}
      >
        {game.status === 'installed' ? 'Play' : 'Install'}
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: 230,
    flexShrink: 0,
    backgroundColor: 'var(--color-surface)',
    borderLeft: '1px solid var(--color-border)',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
  },
  empty: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-main)',
    margin: 0,
  },
  cover: {
    height: 120,
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  coverText: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-main)',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: '0 0 8px',
    fontFamily: 'var(--font-main)',
  },
  desc: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
    margin: '0 0 16px',
    flex: 1,
    fontFamily: 'var(--font-main)',
  },
  btn: {
    width: '100%',
    padding: '10px 0',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'var(--font-main)',
  },
  btnPlay: {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-accent-text)',
  },
  btnInstall: {
    backgroundColor: 'var(--color-sand)',
    color: 'var(--color-text-secondary)',
  },
}
