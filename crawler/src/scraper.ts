import { chromium } from "playwright"

export const getLatLngFromMap = async (
  url: string,
): Promise<{ lat: string; lng: string } | null> => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    console.log(`🌐 Opening: ${url}`)
    await page.goto(url, { waitUntil: "domcontentloaded" })

    const currentUrl = page.url()

    const match = currentUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
    if (match) {
      const [, lat, lng] = match
      console.log(`✅ Lat: ${lat}, Lng: ${lng}`)
      return { lat, lng }
    }

    const searchMatch = currentUrl.match(/search\/([^?]+)\?/)
    if (searchMatch) {
      const coordinates = searchMatch[1].split(",")
      const lat = coordinates[0]
      const lng = coordinates[1]
      console.log(`✅ Lat: ${lat}, Lng: ${lng}`)
      return { lat, lng }
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
