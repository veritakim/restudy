import puppeteer from "puppeteer";


async function startCrawling () {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({width: 1280, height: 720})
  await page.goto("https://www.goodchoice.kr/")
  // await page.setTimeout(() => {}, 1000);

  const stage = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span", (el) => (el.textContent))
  const location = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)", (el) => (el.textContent))
  const price = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b", (el) => (el.textContent))

  console.log(stage)
  console.log(location)
  console.log(price)
}

startCrawling();