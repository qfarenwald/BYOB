const themesData = require('../../../data/themesData.js');

const createTheme = (knex, theme) => {
  return knex('themes').insert({
    id: theme.id,
    name: theme.name,
    parent_id: theme.parent_id
  }, 'id')
};

exports.seed = (knex) => {
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
