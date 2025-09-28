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

// 地図スタイルの定義
const MAP_STYLES = {
  STREETS: "mapbox://styles/mapbox/streets-v12",
  SATELLITE: "mapbox://styles/mapbox/satellite-streets-v12",
} as const

type MapStyleType = (typeof MAP_STYLES)[keyof typeof MAP_STYLES]

// カスタムスタイルスイッチャーコントロール
class StyleSwitcherControl implements mapboxgl.IControl {
  private map: mapboxgl.Map | undefined
  private container: HTMLDivElement | undefined
  private currentStyle: MapStyleType = MAP_STYLES.STREETS
  private onStyleChange: (style: MapStyleType) => void

  constructor(onStyleChange: (style: MapStyleType) => void) {
    this.onStyleChange = onStyleChange
  }

  onAdd(map: mapboxgl.Map): HTMLElement {
    this.map = map
    this.container = document.createElement("div")
    this.container.className = "mapboxgl-ctrl mapboxgl-ctrl-group"
    this.updateButton()

    this.container.addEventListener("click", this.handleToggle.bind(this))
    return this.container
  }

  private updateButton(): void {
    if (!this.container) return

    const isStreets = this.currentStyle === MAP_STYLES.STREETS
    const title = isStreets ? "衛星写真に切り替え" : "通常の地図に切り替え"

    this.container.innerHTML = `
      <button type="button" aria-label="${title}" title="${title}" style="padding: 5px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/>
        </svg>
      </button>
    `
  }

  onRemove(): void {
    if (this.container?.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
    this.map = undefined
  }

  handleToggle(): void {
    if (!this.map) return

    const newStyle =
      this.currentStyle === MAP_STYLES.STREETS
        ? MAP_STYLES.SATELLITE
        : MAP_STYLES.STREETS
    this.map.setStyle(newStyle)
    this.currentStyle = newStyle
    this.onStyleChange(newStyle)

    // ボタンのアイコンとツールチップを更新
    this.updateButton()
  }

  setStyle(style: MapStyleType): void {
    this.currentStyle = style
    this.updateButton()
  }
}

export const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!mapContainerRef.current) return

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLES.STREETS, // 初期スタイルは固定
      center: [133.0461264, 35.4676648],
      zoom: 14,
    })

    const language = new MapboxLanguage()
    mapInstance.addControl(language)
    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right")

    // 現在地機能を追加
    mapInstance.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
      }),
      "top-right",
    )

    // スタイルスイッチャーコントロールを追加
    const styleSwitcher = new StyleSwitcherControl((style) => {
      // スタイル変更時の処理（必要に応じて）
      console.log("Style changed to:", style)
    })
    mapInstance.addControl(styleSwitcher, "top-left")

    locationData.forEach((location: Location) => {
      new mapboxgl.Marker()
        .setLngLat([Number(location.lng), Number(location.lat)])
        .setPopup(new mapboxgl.Popup().setText(location.place))
        .addTo(mapInstance)
    })

    setMap(mapInstance)

    return () => mapInstance.remove()
  }, [])

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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
        <form onSubmit={handleSearch}>
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
