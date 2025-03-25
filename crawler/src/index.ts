import { config } from "dotenv"
import * as fs from "fs"
import { getContentLinks, getTownLinks } from "./parser"
import { getLatLngFromMap } from "./scraper"

config()

const BASE_URL = process.env.BASE_URL || ""
const OUTPUT_PATH = process.env.OUTPUT_PATH || ""

interface LocationInfo {
  place: string
  lat: string
  lng: string
}

const main = async () => {
  console.log(`🔍 Starting crawl from ${BASE_URL}`)

  // Step1
  const townLinks = await getTownLinks(BASE_URL)
  console.log(`✅ Found ${townLinks.length} town links`)

  const results: LocationInfo[] = []

  // Step2
  for (const townLink of townLinks) {
    console.log(`🔎 Crawling: ${townLink}`)
    const linksWithPlaces = await getContentLinks(townLink)

    // Step3
    for (const { href, place } of linksWithPlaces) {
      const latLng = await getLatLngFromMap(href)
      if (latLng) {
        results.push({
          place,
          lat: latLng.lat,
          lng: latLng.lng,
        })
      }
    }
  }

  // Output
  const jsonData = JSON.stringify(results, null, 2)
  fs.writeFileSync(OUTPUT_PATH, jsonData)

  console.log(`✅ Results saved to ${OUTPUT_PATH}`)
}

main().catch(console.error)
