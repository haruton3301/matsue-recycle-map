// 地図スタイルの定義
export const MAP_STYLES = {
  STREETS: "mapbox://styles/mapbox/streets-v12",
  SATELLITE: "mapbox://styles/mapbox/satellite-streets-v12",
} as const

export type MapStyleType = (typeof MAP_STYLES)[keyof typeof MAP_STYLES]

// デフォルト地図設定
export const DEFAULT_MAP_CONFIG = {
  center: [133.0461264, 35.4676648] as [number, number],
  zoom: 14,
  style: MAP_STYLES.STREETS,
} as const
