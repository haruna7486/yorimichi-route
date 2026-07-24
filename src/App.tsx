import './App.css'

function App() {
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
          <input placeholder="例：豊洲駅" />
        </label>

        <label>
          目的地
          <input placeholder="例：武蔵野大学 有明キャンパス" />
        </label>

        <div className="buttons">
          <button>速さ重視</button>
          <button>海沿い</button>
          <button>公園・緑</button>
          <button>桜スポット</button>
        </div>
      </section>
    </main>
  )
}

export default App