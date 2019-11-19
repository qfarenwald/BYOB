const csv = require('csv-parser');
const fs = require('fs');

var setsData = [];
//
const data = fs.createReadStream('sets.csv')
  .pipe(csv())
  .on('data', (row) => {
    setsData.push(row);
  })
  .on('data', () => console.log('here', setsData))
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
//
//
// fs.writeFile('setsData.js', setsData, (err) => {
//     if (err) throw err;
//
//     console.log('sets data saved!');
// });


// fs.readFile('sets.csv', (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   setsData = data;
// })


// // write to a new file named 2pac.txt
// fs.writeFile('setsData.js', setsData, (err) => {
//     // throws an error, you could also catch it here
//     if (err) throw err;
//
//     // success case, the file was saved
//     console.log('sets data saved!');
// });
