const puppeteer = require('puppeteer')
const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://plataforma.saude.gov.br/novocoronavirus/#COVID-19-brazil')
  
  
  //await page.waitForFunction(`document.querySelector('#BRTableByData table > tbody > tr > th').innerText.includes('Rondônia')`)
  await page.waitFor(10000);
  await page.screenshot({path: 'exemplo3.png'})
  const result = await page.evaluate(() => {
      const content = {}      
      
    return content
  })
  
  browser.close()
  return result;
};

scrape().then((value) => {
    console.log(value)
})