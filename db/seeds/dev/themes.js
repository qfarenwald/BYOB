const themesData = require('../../../data/themesData.json');

const createTheme = (knex, theme) => {
  return knex('themes').insert({
    id: theme.id,
    name: theme.name,
    parent_id: theme.parent_id
  }, 'inc_id')
};

exports.seed = (knex) => {
  // need to delete sets to get rid of error, but seeds alphabetically
  return knex('themes').del()
    .then(() => {
      let themePromises = [];

      themesData.forEach(theme => {
        themePromises.push(createTheme(knex, theme));
      });

      return Promise.all(themePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
