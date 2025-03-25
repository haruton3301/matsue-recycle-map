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
    const href = $(el).attr("href")
    const place = $(el).text().trim()

    if (href && href.includes("goo.gl/maps")) {
      const absoluteUrl = new URL(href, url).href
      links.push({ href: absoluteUrl, place })
    }
  })

  return links
}
