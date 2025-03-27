import axios from "axios"
import * as cheerio from "cheerio"

interface LinkInfo {
  href: string
  place: string
}

export const getTownLinks = async (url: string): Promise<Array<string>> => {
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  const links: string[] = []

  const firstH2 = $("h2").first()
  const betweenH2Links = firstH2.nextUntil("h2").find("a")

  betweenH2Links.each((_, el) => {
    const href = $(el).attr("href")
    if (href) {
      const absoluteUrl = new URL(href, url).href
      links.push(absoluteUrl)
    }
  })

  return links
}

export const getContentLinks = async (
  url: string,
): Promise<Array<LinkInfo>> => {
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  const links: LinkInfo[] = []

  $("#contents a").each((_, el) => {
    let href = $(el).attr("href")
    const place = $(el).text().trim()

    if (href) {
      const match = href.match(
        /(goo\.gl\/maps\/[\w-]+|maps\.app\.goo\.gl\/[\w-]+)/,
      )

      if (match) {
        href = `https://${match[0]}`
      } else {
        href = new URL(href, url).href
      }

      if (href.includes("goo.gl/maps") || href.includes("maps.app.goo.gl")) {
        links.push({ href, place })
      }
    }
  })

  return links
}
