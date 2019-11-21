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


let sets = [
  { set_num: '00-1', name: 'Weetabix Castle', year: '1970', theme_id: '414', num_parts: '471' },
  { set_num: '0011-2', name: 'Town Mini-Figures', year: '1978', theme_id: '84', num_parts: '12' },
  { set_num: '0011-3', name: 'Castle 2 for 1 Bonus Offer', year: '1987', theme_id: '199', num_parts: '2' },
  { set_num: '0012-1', name: 'Space Mini-Figures', year: '1979', theme_id: '143', num_parts: '12' },
  { set_num: '0013-1', name: 'Space Mini-Figures', year: '1979', theme_id: '143', num_parts: '12' }
]

const cleanSets = () => {
  return sets.map((set) => {
    set.set_num = set.set_num.replace(/-/gi, '');
    return set
  })
}
