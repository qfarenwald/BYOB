const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.locals.title = 'BYOB';

// root
app.get('/', (request, response) => {
  response.send('BYOB ROOT');
});

// sets
app.get('/api/v1/sets', (request, response) => {
  database('sets').select()
    .then((sets) => {
      response.status(200).json(sets);
    })
    .catch((error) => {
      response.status(404).send({
        error: 'The sets data can not be found.'
    });
  })
});

app.get('/api/v1/sets/:id', (request, response) => {
  const { id } = request.params;
  database('sets').select()
    .then((sets) => {
      const selectedSet = sets.find((set) => {
        return set.inc_id === parseInt(id)
      })
      if (!selectedSet) {
        response.status(404).send({
          error: 'The set data you are looking for can not be found. Please try another set id.'
        });
      }
      return selectedSet
    })
    .then((selectedSet) => {
      response.status(200).json(selectedSet);
    })
    .catch((error) => {
      response.status(404).send({
        error: 'There were problems connecting to the database.'
    });
  })
});

app.post('/api/v1/sets', (request, response) => {
  const set = request.body;
  console.log(set)
  for (let requiredParameter of ['set_num', 'name', 'year', 'theme_id', 'num_parts']) {
    if (!set[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { set_num: <String>, name: <String>, year: <Integer>, theme_id: <Integer>, num_parts: <Integer> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  database('sets').insert(set, 'inc_id')
    .then(set => {
      console.log('hello')
      response.status(201).json({ id: set[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// themes
app.get('/api/v1/themes', (request, response) => {
  database('themes').select()
    .then((themes) => {
      response.status(200).json(themes);
    })
    .catch((error) => {
      response.status(404).send({
        error: 'The themes data can not be found.'
    });
  })
});

app.get('/api/v1/themes/:id', (request, response) => {
  const { id } = request.params;
  database('themes').select()
    .then((themes) => {
      const selectedTheme = themes.find((theme) => {
        return theme.id === parseInt(id)
      })
      response.status(200).json(selectedTheme);
    })
    .catch((error) => {
      response.status(404).send({
        error: 'The theme data you are looking for can not be found. Please try another theme id.'
    });
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
