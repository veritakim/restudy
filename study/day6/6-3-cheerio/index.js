import axios from 'axios'
import * as cheerio from 'cheerio'

async function createMessage() {
  const result = await axios.get("https://www.naver.com")

  const ch = cheerio.load(result.data)
  ch('meta').each((_, el) => {
    if(ch(el).attr("property")?.includes("og:")){
      const key = ch(el).attr("property") // og:title
      const value = ch(el).attr("content")
      console.log("key: " + key + "value: " + value)
    }
  })
}

createMessage()