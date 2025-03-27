import { chromium } from "playwright"

const dmsToDecimal = (
  degrees: number,
  minutes: number,
  seconds: number,
  direction: string,
): number => {
  let decimal = degrees + minutes / 60 + seconds / 3600
  if (direction === "S" || direction === "W") {
    decimal *= -1
  }
  return parseFloat(decimal.toFixed(6))
}

export const getLatLngFromMap = async (
  url: string,
): Promise<{ lat: string; lng: string } | null> => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto(url)
    await page.waitForURL("**/www.google.co.jp/maps/**", {
      waitUntil: "domcontentloaded",
    })

    const currentUrl = page.url()

    const dmsMatch = currentUrl.match(/place\/([^/?]+)/)
    if (dmsMatch) {
      const decoded = decodeURIComponent(dmsMatch[1])
      console.log(`🔍 Extracted DMS: ${decoded}`)

      const latMatch = decoded.match(/(\d+)°(\d+)'([\d.]+)"([NS])/)
      const lngMatch = decoded.match(/(\d+)°(\d+)'([\d.]+)"([EW])/)

      if (latMatch && lngMatch) {
        const lat = dmsToDecimal(
          parseInt(latMatch[1]),
          parseInt(latMatch[2]),
          parseFloat(latMatch[3]),
          latMatch[4],
        )

        const lng = dmsToDecimal(
          parseInt(lngMatch[1]),
          parseInt(lngMatch[2]),
          parseFloat(lngMatch[3]),
          lngMatch[4],
        )

        console.log(`✅ Lat: ${lat}, Lng: ${lng}`)
        return { lat: lat.toString(), lng: lng.toString() }
      }
    }

    const dirMatch = currentUrl.match(/dir\/\/([^/]+)/)
    if (dirMatch) {
      const [lat, lng] = dirMatch[1].split(",").map((v) => v.trim())

      if (lat && lng) {
        console.log(`✅ Lat: ${lat}, Lng: ${lng}`)
        return { lat, lng }
      }
    }

    const dirABMatch = currentUrl.match(/dir\/([^/]+)\/([^/]+)/)
    if (dirABMatch) {
      const [, , b] = dirABMatch
      const [lat, lng] = b.split(",").map((v) => v.trim())

      if (lat && lng) {
        console.log(`✅ Lat: ${lat}, Lng: ${lng}`)
        return { lat, lng }
      }
    }

    const searchMatch = currentUrl.match(/search\/([^?]+)/)
    if (searchMatch) {
      const [lat, lng] = searchMatch[1].split(",").map((v) => v.trim())
      if (lat && lng) {
        console.log(`✅ Lat: ${lat}, Lng: ${lng}`)
        return { lat, lng }
      }
    }

    console.warn(`❌ No lat/lng found in: ${currentUrl}`)
    return null
  } catch (error) {
    console.error(`🔥 Error scraping ${url}:`, error)
    return null
  } finally {
    await browser.close()
  }
}
