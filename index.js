const fs = require('fs');
const csv = require('csv-parser');
console.log("Week 1 Lab Exercise 1");


console.log("Removing canada.txt if exists");
if (fs.existsSync('canada.txt')) {
    fs.unlinkSync('canada.txt');
    console.log('canada.txt deleted');
}

console.log("Removing usa.txt if exists");
if (fs.existsSync('usa.txt')) {
    fs.unlinkSync('usa.txt');
    console.log('usa.txt deleted');
}

fs.appendFileSync('canada.txt', `country,year,population\n`);
fs.appendFileSync('usa.txt', `country,year,population\n`);

// read data from input_countries.csv

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (data) => {
        console.log(data);
        //filter data and write to canada.txt
        if (data.country == "Canada") {
            fs.appendFileSync('canada.txt', `${data.country},${data.year},${data.population}\n`);
        }
        //filter data and write to usa.txt
        if (data.country == "United States") {
            fs.appendFileSync('usa.txt', `${data.country},${data.year},${data.population}\n`);
        }

    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

