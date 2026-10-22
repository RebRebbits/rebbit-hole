export interface Game {
  id: string
  title: string
  description: string
  status: 'installed' | 'not_installed'
  coverColor?: string  // placeholder until real cover art is added
}

interface GameCardProps {
  game: Game
  selected: boolean
  onSelect: (game: Game) => void
}

export default function GameCard({ game, selected, onSelect }: GameCardProps) {
  return (
    <div
      style={{
        ...styles.card,
        ...(selected ? styles.cardSelected : {}),
      }}
      onClick={() => onSelect(game)}
    >
      {/* Cover art placeholder */}
      <div style={{ ...styles.cover, backgroundColor: game.coverColor ?? 'var(--color-sand)' }}>
        <span style={styles.coverText}>cover art</span>
      </div>

      {/* Info */}
      <div style={styles.info}>
        <p style={styles.title}>{game.title}</p>
        <p style={styles.status}>
          {game.status === 'installed' ? 'Installed' : 'Not installed'}
        </p>
        <button
          style={{
            ...styles.btn,
            ...(game.status === 'installed' ? styles.btnPlay : styles.btnInstall),
          }}
          onClick={(e) => {
            e.stopPropagation() // don't also trigger onSelect
            // TODO: wire up play / install logic
          }}
        >
          {game.status === 'installed' ? 'Play' : 'Install'}
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  },
  cardSelected: {
    borderColor: 'var(--color-accent)',
    borderWidth: 2,
  },
  cover: {
    height: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverText: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-main)',
  },
  info: {
    padding: '8px 10px 10px',
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: '0 0 3px',
    fontFamily: 'var(--font-main)',
  },
  status: {
    fontSize: 11,
    color: 'var(--color-text-secondary)',
    margin: '0 0 7px',
    fontFamily: 'var(--font-main)',
  },
  btn: {
    width: '100%',
    padding: '5px 0',
    border: 'none',
    borderRadius: 4,
    fontSize: 11,
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
