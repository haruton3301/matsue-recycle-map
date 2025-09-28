/**
 * GoogleマップのストリートビューURLを生成する
 * @param lat 緯度
 * @param lng 経度
 * @returns GoogleマップのストリートビューURL
 */
export const generateStreetViewUrl = (
  lat: string | number,
  lng: string | number,
): string => {
  return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`
}
