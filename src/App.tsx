import { useState } from 'react'
import './App.css'

type RoutePreference = 'fastest' | 'waterfront' | 'green' | 'cherry'

const routePreferences: { id: RoutePreference; label: string }[] = [
  { id: 'fastest', label: '速さ重視' },
  { id: 'waterfront', label: '海沿い' },
  { id: 'green', label: '公園・緑' },
  { id: 'cherry', label: '桜スポット' },
]

function App() {
  const [start, setStart] = useState('豊洲駅')
  const [destination, setDestination] = useState('武蔵野大学 有明キャンパス')
  const [preference, setPreference] = useState<RoutePreference>('waterfront')

  return (
    <main className="app">
      <section className="hero">
        <p className="app-name">Yorimichi Route</p>
        <h1>今日は、どんな道で行く？</h1>
        <p className="lead">
          最短だけでなく、海沿い・公園・桜スポットなど、気分に合う道を選べるルート案内アプリです。
        </p>
      </section>

      <section className="search-panel">
        <label>
          出発地
          <input value={start} onChange={(event) => setStart(event.target.value)} />
        </label>

        <label>
          目的地
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </label>

        <div className="buttons">
          {routePreferences.map((item) => (
            <button
              key={item.id}
              type="button"
              className={preference === item.id ? 'selected' : ''}
              onClick={() => setPreference(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="preview">
          <p>現在の条件</p>
          <strong>
            {start} から {destination} まで、{routePreferences.find((item) => item.id === preference)?.label}
            のルートを探します。
          </strong>
        </div>
      </section>
    </main>
  )
}

export default App