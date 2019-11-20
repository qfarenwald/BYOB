const csv = require('csvtojson');
const setsDataCSV = 'sets.csv';
const themesDataCSV = 'themes.csv';
var fs = require('fs');

// setsData
csv()
  .fromFile(setsDataCSV)
  .then((jsonObj) => {
    console.log(jsonObj)
    return JSON.stringify(jsonObj)
  })
  .then((jsonArr) => {
    fs.writeFile('setsData.json', jsonArr, (err) => {
      if (err) throw err;
      console.log('Data is now written to the file')
    })
  })

// themesData
csv()
  .fromFile(themesDataCSV)
  .then((jsonObj) => {
    console.log(jsonObj)
    return JSON.stringify(jsonObj)
  })
  .then((jsonArr) => {
    fs.writeFile('themesData.json', jsonAdrr, (err) => {
      if (err) throw err;
      console.log('Data is now written to the file')
    })
  })
