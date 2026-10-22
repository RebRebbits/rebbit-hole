import { useState } from 'react'
import GameCard, { type Game } from '../components/GameCard'
import GameDetail from '../components/GameDetail'

// Placeholder games — will be replaced by API data later
const PLACEHOLDER_GAMES: Game[] = [
  {
    id: '1',
    title: 'Forest Quest',
    description: 'An indie RPG set in an enchanted woodland. Collect herbs, meet forest spirits, and uncover the mystery of the vanishing river.',
    status: 'installed',
    coverColor: '#B8C9A3',
  },
  {
    id: '2',
    title: 'Hollow Den',
    description: 'A cozy mystery visual novel. Play as a rabbit detective solving puzzles in a sleepy burrow village.',
    status: 'not_installed',
    coverColor: '#C9B99A',
  },
]

export default function Library() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(PLACEHOLDER_GAMES[0])

  return (
    <div style={styles.wrapper}>
      {/* Game grid */}
      <div style={styles.main}>
        <h1 style={styles.heading}>Your library</h1>
        <div style={styles.grid}>
          {PLACEHOLDER_GAMES.map(game => (
            <GameCard
              key={game.id}
              game={game}
              selected={selectedGame?.id === game.id}
              onSelect={setSelectedGame}
            />
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <GameDetail game={selectedGame} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    minWidth: 0,
  },
  main: {
    flex: 1,
    padding: '24px 20px',
    overflowY: 'auto',
    minWidth: 0,
  },
  heading: {
    fontSize: 16,
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: '0 0 16px',
    fontFamily: 'var(--font-main)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 12,
  },
}
