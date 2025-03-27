import MapboxLanguage from "@mapbox/mapbox-gl-language"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useRef, useState } from "react"

type Location = {
  place: string
  lat: string
  lng: string
}

import locations from "../data/locations.json"
const locationData: Array<Location> = locations

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!mapContainerRef.current) return

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [133.0461264, 35.4676648],
      zoom: 14,
    })

    const language = new MapboxLanguage()
    mapInstance.addControl(language)
    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right")

    locationData.forEach((location: Location) => {
      new mapboxgl.Marker()
        .setLngLat([Number(location.lng), Number(location.lat)])
        .setPopup(new mapboxgl.Popup().setText(location.place))
        .addTo(mapInstance)
    })

    setMap(mapInstance)

    return () => mapInstance.remove()
  }, [])

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        `松江市${searchQuery || "末次町"}`,
      )}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`,
    )

    const data = await response.json()

    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center
      if (map) {
        map.setCenter([lng, lat])
        map.setZoom(14)
      }
    } else {
      alert("住所が見つかりませんでした")
    }
  }

  return (
    <div>
      <div className="flex items-center mb-3">
        <div className="flex-1 flex items-center gap-2">
          <label className="input flex items-center max-w-[320px]">
            松江市
            <input
              type="text"
              className="grow"
              placeholder="末次町"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <button className="btn" onClick={handleSearch}>
            移動
          </button>
        </div>
      </div>
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-md shadow-md"
      />
    </div>
  )
}
