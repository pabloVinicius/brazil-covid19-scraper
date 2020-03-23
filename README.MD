<h1 align="center">
  Brazil COVID-19 epidemic data scraper
</h1>

> Gathering up data from [Brazil official page about COVID-19](http://plataforma.saude.gov.br/novocoronavirus/#COVID-19-brazil) and [Wikipedia Brazil Covid-19 page](https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Brazil#cite_note-107)

> Brazil official page is offline since 18/03/2020 (theoretically under maintenance)

> Wikipedia Brazil Covid-19 page is fulfilled with data from news, all source are available on page


## Tech Stack
-  [nightmare](https://github.com/segmentio/nightmare)

## How to run

```bash
$ git clone https://github.com/pabloVinicius/brazil-covid19-scraper.git

$ cd brazil-covid19-scraper

$ yarn

$ node scraper.js or node wikipedia-scraper.js
```

> It will generate a JSON file in data folder with the date of execution
