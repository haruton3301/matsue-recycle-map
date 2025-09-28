import "mapbox-gl/dist/mapbox-gl.css"
import { useState } from "react"

import { useMapbox } from "../lib/hooks/useMapbox"
import type { Location } from "../types/location"

import locations from "../data/locations.json"
const locationData: Array<Location> = locations

export const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { mapContainerRef, handleSearch } = useMapbox(locationData)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSearch(searchQuery)
  }

  return (
    <div>
      <div className="flex items-center mb-3">
        <form onSubmit={onSubmit}>
          <div className="flex items-center gap-2">
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
            <button type="submit" className="btn">
              移動
            </button>
          </div>
        </form>
      </div>
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-md shadow-md"
      />
    </div>
  )
}
