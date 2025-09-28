import { generateStreetViewUrl } from "./streetView"

/**
 * ポップアップのHTMLコンテンツを生成する
 * @param placeName 場所名
 * @param lat 緯度
 * @param lng 経度
 * @returns ポップアップのHTMLコンテンツ
 */
export const generatePopupHTML = (
  placeName: string,
  lat: string | number,
  lng: string | number,
): string => {
  const streetViewUrl = generateStreetViewUrl(lat, lng)

  return `
    <div style="max-width: 250px;">
      <h3 style="
        margin: 0 0 8px 0;
        font-size: 12px;
        font-weight: bold;
        word-wrap: break-word;
        line-height: 1.3;
        max-width: 100%;
        padding-right: 12px;
      ">${placeName}</h3>
      <button
        onclick="window.open('${streetViewUrl}', '_blank')"
        style="
          background: #4285f4;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 5px;
          width: 100%;
          justify-content: center;
        "
        onmouseover="this.style.background='#3367d6'"
        onmouseout="this.style.background='#4285f4'"
      >
        ストリートビューで見る
      </button>
    </div>
  `
}
