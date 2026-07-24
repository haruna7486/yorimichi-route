import { useMemo, useState } from 'react'
import './App.css'

type RoutePreference = 'fastest' | 'waterfront' | 'green' | 'cherry'

type RouteOption = {
  id: string
  title: string
  minutes: number
  distanceKm: number
  via?: string
  description: string
}

const routePreferences: { id: RoutePreference; label: string }[] = [
  { id: 'fastest', label: '速さ重視' },
  { id: 'waterfront', label: '海沿い' },
  { id: 'green', label: '公園・緑' },
  { id: 'cherry', label: '桜スポット' },
]

const scenicSpots: Record<Exclude<RoutePreference, 'fastest'>, string> = {
  waterfront: '豊洲ぐるり公園',
  green: '有明テニスの森',
  cherry: 'シンボルプロムナード公園',
}

function buildRouteOptions(
  preference: RoutePreference,
  sceneryPriority: number,
): RouteOption[] {
  const normalRoute: RouteOption = {
    id: 'normal',
    title: '通常ルート',
    minutes: 18,
    distanceKm: 1.4,
    description: 'できるだけ早く目的地に向かうルートです。',
  }

  if (preference === 'fastest') {
    return [normalRoute]
  }

  const extraMinutes = Math.round(4 + sceneryPriority / 10)
const extraDistance = Number((0.3 + sceneryPriority / 200).toFixed(1))

const scenicRoute: RouteOption = {
  id: 'scenic',
  title: '希望に合わせた寄り道ルート',
  minutes: normalRoute.minutes + extraMinutes,
  distanceKm: Number((normalRoute.distanceKm + extraDistance).toFixed(1)),
  via: scenicSpots[preference],
  description: '景観の優先度に合わせて、遠回りの許容度を変える想定のルートです。',
}
  return [normalRoute, scenicRoute]
}

function App() {
  const [start, setStart] = useState('豊洲駅')
  const [destination, setDestination] = useState('武蔵野大学 有明キャンパス')
  const [preference, setPreference] = useState<RoutePreference>('waterfront')
  const [sceneryPriority, setSceneryPriority] = useState(70)

  const routeOptions = useMemo(
  () => buildRouteOptions(preference, sceneryPriority),
  [preference, sceneryPriority],
)
  const selectedLabel = routePreferences.find((item) => item.id === preference)?.label

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
<label className="priority-slider">
  <span>速さ重視</span>
  <input
    type="range"
    min="0"
    max="100"
    step="10"
    value={sceneryPriority}
    onChange={(event) => setSceneryPriority(Number(event.target.value))}
  />
  <span>景観重視</span>
</label>
        <div className="preview">
          <p>現在の条件</p>
          <strong>
            {start} から {destination} まで、{selectedLabel}
            のルートを探します。
          </strong>
        </div>
      </section>

      <section className="route-section">
        <h2>ルート候補</h2>

        <div className="route-cards">
          {routeOptions.map((route) => (
            <article className="route-card" key={route.id}>
              <p className="route-title">{route.title}</p>

              <div className="route-main">
                <strong>{route.minutes}分</strong>
                <span>{route.distanceKm}km</span>
              </div>

              {route.via && <p className="route-via">経由：{route.via}</p>}

              <p className="route-description">{route.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App