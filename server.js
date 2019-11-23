// like... import express from 'express';
const express = require('express');
// creates an express app by invoking express function... sets up app and allows us to use the methods available as seen further down below file (.set, .use, .get, etc)
const app = express();

// configurations to work with the knex database
// setup the environment by describing the development port
const environment = process.env.NODE_ENV || 'development';
// setup the configuration which uses the data in the knexfiles and runs in the environment created on the line above
const configuration = require('./knexfile')[environment];
// setup the database that requires knex and use the knexfile data and enviroment also created above
const database = require('knex')(configuration);

// process.env.PORT makes more flexible so we can use same line of code for when utilizing local server and heroku
app.set('port', process.env.PORT || 3000);

// will parse all our information so we can use js
app.use(express.json());

// do not actually need this line because app.locals is not being utilized to store anything, no need for a title there
// app.locals.title = 'BYOB';

// root
// if the method is get and the path is the root, send this response
app.get('/', (request, response) => {
  response.send('BYOB ROOT');
});

// sets
// if the method is get and the path is this...
app.get('/api/v1/sets', (request, response) => {
  // select the information in the table titled 'sets'
  database('sets').select()
    // wait till we have that data, then...
    .then((sets) => {
      // if there are no sets, return this status code and response
      if (!sets) {
        return response.status(404).send({
          error: 'The sets data can not be found.'
        });
      }
      // else, if there are sets, return this status code and response which is the json version of the sets
      response.status(200).json(sets);
    })
    // if there is an error with the database and the .then can not run, then return this status code and response
    .catch((error) => {
      response.status(500).send({
        error: 'There were problems connecting to the database.'
    });
  })
});

// if the method is get and the path is this...
app.get('/api/v1/sets/:id', (request, response) => {
  // deconstruct the id provided in the url
  const { id } = request.params;
  // select the information in the table titled 'sets'
  database('sets').select()
    // wait till we have that data, then...
    .then((sets) => {
      // create a new variable 'selectedSet' and set it to the found object of the find array prototype method
      const selectedSet = sets.find((set) => {
        // iterate over all the sets and return the set that its inc_id matches the id provided in the URL
        return set.inc_id === parseInt(id)
      })
      // if no set object is returned, return this status code and response
      if (!selectedSet) {
        return response.status(404).send({
          error: 'The set data you are looking for can not be found. Please try another set id.'
        });
      }
      // else if a set object is returned, return this status code and the json set
      response.status(200).json(selectedSet);
    })
    // if there is an error with the database and the .then can not run, then return this status code and response
    .catch((error) => {
      response.status(500).send({
        error: 'There were problems connecting to the database.'
    });
  })
});

// if the method is post and the path is this...
app.post('/api/v1/sets', (request, response) => {
  // create a new variable set and assign it to the object specified in the response body
  const set = request.body;
  // loops through the keys of the set object
  for (let requiredParameter of ['set_num', 'name', 'year', 'theme_id', 'num_parts']) {
    // if a key is not there, send this status code and response
    if (!set[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { set_num: <String>, name: <String>, year: <Integer>, theme_id: <Integer>, num_parts: <Integer> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  // else, if the set request body has all required values, go to the table titled 'sets' and insert the new set and also provide the auto incremented id
  database('sets').insert(set, 'inc_id')
    // once that occurs, return this status code and an object that contains the new id and the set id
    .then(set => {
      response.status(200).json({ inc_id: set[0] })
    })
    // if there is an error with the database and the .then can not run, then return this status code and response
    .catch(error => {
      response.status(500).send({
        error: 'There were problems connecting to the database.'
      });
    })
  });

// if the method is delete and the path is this...
app.delete('/api/v1/sets/:id', (request, response) => {
  // deconstruct the id provided in the url
  const { id } = request.params;
  // in the table titled 'sets'
  database('sets')
    // find where the inc_id matches the id provided in the URL
    .where({ inc_id: id })
    // delete (be on a lower line? below error handling?)
    .del()
    .then(set => {
    // but if there is not set that matches to delete, return this status code and response
      if (!set) {
        return response.status(404).send({
          error: 'The theme data you are looking for can not be found in order to delete. Please try another set id.'
        });
      }
      // if there was a set deleted, return this status code and return the ids of the deleted set object
      response.status(200).json({ inc_id: id })
    })
    // if there is an error with the database and the .then can not run, then return this status code and response
    .catch(error => {
      response.status(500).send({
        error: 'There were problems connecting to the database.'
      });
    })
  })

// themes is set up identically to sets so the notations will stop here and resume at the app.listen method at the bottom
// themes
app.get('/api/v1/themes', (request, response) => {
  database('themes').select()
    .then((themes) => {
      if (!themes) {
        return response.status(404).send({
          error: 'The themes data can not be found.'
        });
      }
      response.status(200).json(themes);
    })
    .catch((error) => {
      response.status(500).send({
        error: 'There were problems connecting to the database.'
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
      if (!selectedTheme) {
        response.status(404).send({
          error: 'The theme data you are looking for can not be found. Please try another theme id.'
        });
      }
      response.status(200).json(selectedTheme);
    })
    .catch((error) => {
      response.status(500).send({
        error: 'There were problems connecting to the database.'
    });
  })
});

app.post('/api/v1/themes', (request, response) => {
  const theme = request.body;
  for (let requiredParameter of ['id', 'name', 'parent_id']) {
    if (!theme[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { id: <Integer>, name: <String>, parent_id: <Integer> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  database('themes').insert(theme, 'inc_id')
    .then(theme => {
      response.status(200).json({ inc_id: theme[0] })
    })
    .catch(error => {
      response.status(500).send({
        error: 'There were problems connecting to the database.'
      });
    });
  });

app.delete('/api/v1/themes/:id', (request, response) => {
  const { id } = request.params;
  database('themes')
    .where({ inc_id: id })
    .del()
    .then(theme => {
      if (!theme) {
        return response.status(404).send({
          error: 'The theme data you are looking for can not be found in order to delete. Please try another set id.'
        });
      }
      response.status(200).json({ inc_id: id })
    })
    .catch(error => {
      response.status(500).send({
        error: 'There were problems connecting to the database.'
      });
    })
  })

// get server running and listening for requests
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
