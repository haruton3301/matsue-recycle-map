import MapboxLanguage from "@mapbox/mapbox-gl-language"
import mapboxgl from "mapbox-gl"
import { useEffect, useRef, useState } from "react"

import type { Location } from "../../types/location"
import { DEFAULT_MAP_CONFIG } from "../mapbox/constants"
import { StyleSwitcherControl } from "../mapbox/controls/StyleSwitcherControl"
import { generatePopupHTML } from "../mapbox/utils/popup"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

/**
 * Mapboxの地図を管理するカスタムフック
 * @param locationData 表示する場所データの配列
 * @returns 地図のref、地図インスタンス、検索関数
 */
export const useMapbox = (locationData: Location[]) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: DEFAULT_MAP_CONFIG.style,
      center: DEFAULT_MAP_CONFIG.center,
      zoom: DEFAULT_MAP_CONFIG.zoom,
    })

    // 言語設定
    const language = new MapboxLanguage()
    mapInstance.addControl(language)

    // ナビゲーションコントロール
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
      console.log("Style changed to:", style)
    })
    mapInstance.addControl(styleSwitcher, "top-left")

    // マーカーとポップアップを追加
    locationData.forEach((location: Location) => {
      const popupHTML = generatePopupHTML(
        location.place,
        location.lat,
        location.lng,
      )

      new mapboxgl.Marker()
        .setLngLat([Number(location.lng), Number(location.lat)])
        .setPopup(
          new mapboxgl.Popup({
            closeButton: true,
            className: "custom-popup",
          }).setHTML(popupHTML),
        )
        .addTo(mapInstance)
    })

    setMap(mapInstance)

    return () => mapInstance.remove()
  }, [locationData])

  /**
   * 住所検索を実行する
   * @param searchQuery 検索クエリ
   */
  const handleSearch = async (searchQuery: string) => {
    if (!map) return

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          `松江市${searchQuery || "末次町"}`,
        )}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`,
      )

      const data = await response.json()

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        map.setCenter([lng, lat])
        map.setZoom(14)
      } else {
        alert("住所が見つかりませんでした")
      }
    } catch (error) {
      console.error("検索エラー:", error)
      alert("検索中にエラーが発生しました")
    }
  }

  return {
    mapContainerRef,
    map,
    handleSearch,
  }
}
