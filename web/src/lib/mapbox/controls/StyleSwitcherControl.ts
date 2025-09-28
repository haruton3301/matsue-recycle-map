import type * as mapboxgl from "mapbox-gl"
import { MAP_STYLES, type MapStyleType } from "../constants"

// カスタムスタイルスイッチャーコントロール
export class StyleSwitcherControl implements mapboxgl.IControl {
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
