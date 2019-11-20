const express = require('express');
const app = express();

// data test
// const setsData = require('./data/setsData.json');
// const themesData = require('./data/themesData.json');
//
// console.log('hello', setsData.length)
// console.log('yay', themesData.length)

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.locals.title = 'BYOB';
app.locals.sets = [
  { set_num: '00-1', name: 'Weetabix Castle', year: '1970', theme_id: '414', num_parts: '471' },
  { set_num: '0011-2', name: 'Town Mini-Figures', year: '1978', theme_id: '84', num_parts: '12' },
  { set_num: '0011-3', name: 'Castle 2 for 1 Bonus Offer', year: '1987', theme_id: '199', num_parts: '2' },
  { set_num: '0012-1', name: 'Space Mini-Figures', year: '1979', theme_id: '143', num_parts: '12' },
  { set_num: '0013-1', name: 'Space Mini-Figures', year: '1979', theme_id: '143', num_parts: '12' }
];
app.locals.themes = [
  { id: '414', name: 'Technic', parent_id: '' },
  { id: '84', name: 'Arctic Technic', parent_id: '1' },
  { id: '199', name: 'Competition', parent_id: '1' },
  { id: '143', name: 'Expert Builder', parent_id: '1' },
  { id: '143', name: 'Model', parent_id: '1' }
];

// root
app.get('/', (request, response) => {
  response.send('BYOB ROOT');
});

// sets
app.get('/api/v1/sets', (request, response) => {
  const sets = app.locals.sets;

  if (!sets) {
    return response.status(404).send({
      error: 'The sets data can not be found.'
    });
  }

  response.status(200).json({ sets });
});

app.get('/api/v1/sets/:id', (request, response) => {
  const { id } = request.params;
  const sets = app.locals.sets.find((set) => {
    return set.theme_id === id
  })

  if (!sets) {
    return response.status(404).send({
      error: 'The set data you are looking for can not be found. Please try another set id.'
    });
  }

  response.status(200).json({ sets });
});

// themes
app.get('/api/v1/themes', (request, response) => {
  const themes = app.locals.themes;

  if (!themes) {
    return response.status(404).send({
      error: 'The themes data can not be found.'
    });
  }

  response.status(200).json({ themes });
});

app.get('/api/v1/themes/:id', (request, response) => {
  const { id } = request.params;
  const themes = app.locals.themes.find((theme) => {
    return theme.id === id
  })

  if (!themes) {
    return response.status(404).send({
      error: 'The theme data you are looking for can not be found. Please try another theme id.'
    });
  }

  response.status(200).json({ themes });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
