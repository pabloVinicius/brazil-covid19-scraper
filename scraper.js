const Nightmare = require('nightmare');
const fs = require('fs');

const url = 'http://plataforma.saude.gov.br/novocoronavirus/#COVID-19-brazil';

const nightmare = Nightmare({ show: false });

nightmare
    .goto(url)
    .wait(10000) //wait until table data loads
    .evaluate(() => {
        const rows = document.querySelectorAll('#BRTableByData tbody > tr');
        const data = [{}];
        let currentRegion = 0;
        rows.forEach(row => {
            const isRegion = row.classList.contains('table-info');
            const title = row.querySelector('th').innerText;
            const rowData = row.querySelectorAll('td');

            const rowValues = {
                name: title,
                suspect: rowData[0].innerText,
                confirmed: rowData[2].innerText,
                discarded: rowData[4].innerText,
                total: rowData[6].innerText,
            }

            if(isRegion) {
                data[currentRegion] = {
                    ...data[currentRegion],
                    ...rowValues,
                };
                currentRegion += 1;
                data.push({});
            } else {
                if(data[currentRegion].data) {
                    const currentData = data[currentRegion].data;
                    data[currentRegion].data = [...currentData, rowValues]
                } else {
                    data[currentRegion].data = [rowValues]
                }
            }
        });

        data.pop();

        return data;
    })
    .end()
    .then(response => {
        const currentISO = new Date().toISOString();
        fs.writeFile(`data/${currentISO}.json`, JSON.stringify(response), () => { console.log('Finished.')});
    })
    .catch(err => {
        console.log({ erro: err })
    });
