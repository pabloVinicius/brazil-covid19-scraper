const Nightmare = require('nightmare');
const fs = require('fs');

const url = 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Brazil#cite_note-107';

const nightmare = Nightmare({ show: false });

nightmare
    .goto(url)
    .evaluate(() => {
        const rows = document.querySelectorAll('table.wikitable > tbody > tr');
        const footer = document.querySelectorAll('table.wikitable > tfoot > tr > th');
        const states = {};
        rows.forEach(row => {
            const data = row.querySelectorAll('td');
            try {
                const [state, confirmed, deaths] = data;
                const stateName = state.innerText.slice(1);
                const stateConfirmed = confirmed.innerText.match(/^\d+/)[0];
                const stateDeaths = deaths.innerText;

                states[stateName] = {
                    confirmed: stateConfirmed,
                    deaths: stateDeaths
                };
            } catch (err) {
                console.log({ err })
            }
        });

        const [, totalConfirmed, totalDeaths] = footer;

        return {
            confirmed: totalConfirmed.innerText,
            deaths: totalDeaths.innerText,
            states,
        }

    })
    .end()
    .then(response => {
        const currentISO = new Date().toISOString();
        fs.writeFile(`wikipedia/${currentISO}.json`, JSON.stringify(response), () => { console.log('Finished.') });
    })
    .catch(err => {
        console.log({ erro: err })
    });