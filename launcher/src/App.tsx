import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [status, setStatus] = useState('Checking Supabase...')

  useEffect(() => {
    supabase.auth.getSession().then(({ error }) => {
      setStatus(error ? `Error: ${error.message}` : 'Supabase connected ✓')
    })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Rebbit Hole</h1>
      <p>{status}</p>
    </div>
  )
}

export default App