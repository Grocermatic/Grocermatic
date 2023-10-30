import { scrapeWoolworths } from '../src/website/woolworths/scrapeWoolworths'
import { getCookie } from '../src/request/getCookie'
import { scrapeAldi } from '../src/website/aldi/scrapeAldi'
import { scrapeColes } from '../src/website/coles/scrapeColes'
import { saveJson } from '../src/dataCleaning/saveJson'

const basePath = 'webscrape/data/productInfo'

const aldiProductInfo = async () => {
  const report = await scrapeAldi()
  saveJson(`${basePath}/aldi.json`, report.get())
}

const colesProductInfo = async () => {
  const report = await scrapeColes()
  saveJson(`${basePath}/coles.json`, report.get())
}

const woolworthsProductInfo = async () => {
  const cookie = await getCookie('https://www.woolworths.com.au')
  const report = await scrapeWoolworths(cookie)
  saveJson(`${basePath}/woolworths.json`, report.get())
}

Promise.all([
  woolworthsProductInfo(),
  colesProductInfo(),
  aldiProductInfo(),
])
