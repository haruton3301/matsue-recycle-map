import { logEvent } from "firebase/analytics"
import { useEffect } from "react"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { MapView } from "./components/MapView"
import { Message } from "./components/Message"
import { analytics } from "./lib/firebase"

function App() {
  useEffect(() => {
    logEvent(analytics, "page_view")
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto my-6 px-4">
        <Message />
        <MapView />
      </main>
      <Footer />
    </div>
  )
}

export default App
