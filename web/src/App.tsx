import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { MapView } from "./components/MapView"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto my-6 px-4">
        <div className="mb-5">
          松江市のリサイクルステーションの位置にピンを表示しています。検索欄に町名を入力して「移動」を押すことで、入力した町に移動します。
        </div>
        <MapView />
      </main>
      <Footer />
    </div>
  )
}

export default App
