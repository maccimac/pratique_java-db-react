import { useState, useEffect } from 'react'
import './App.css'

const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL || ''

function App() {
  const [thoughts, setThoughts] = useState([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/api/thoughts`)
      .then(res => res.json())
      .then(setThoughts)
      .catch(() => setError('Could not reach the backend.'))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    if (trimmed.length > 280) {
      setError('Max 280 characters.')
      return
    }
    fetch(`${REACT_APP_API_URL}/api/thoughts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: trimmed }),
    })
      .then(res => res.json())
      .then(newThought => {
        setThoughts(prev => [newThought, ...prev])
        setInput('')
        setError('')
      })
      .catch(() => setError('Failed to save thought.'))
  }

  return (
    <div className="container">
      <h1>Thoughts</h1>

      <form onSubmit={handleSubmit} className="input-area">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="What's on your mind?"
          maxLength={280}
          rows={3}
        />
        <div className="input-footer">
          <span className={input.length > 260 ? 'char-count warn' : 'char-count'}>
            {input.length}/280
          </span>
          <button type="submit" disabled={!input.trim()}>Post</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>

      <ul className="thought-list">
        {thoughts.map(t => (
          <li key={t.id} className="thought-item">
            <p>{t.content}</p>
            <time>{new Date(t.createdAt).toLocaleString()}</time>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
