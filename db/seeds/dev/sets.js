const setsData = require('../../../data/setsData.json');

const createSet = (knex, set) => {
  return knex('sets').insert({
    set_num: set.set_num,
    name: set.name,
    year: set.year,
    theme_id: set.theme_id,
    num_parts: set.num_parts
  }, 'inc_id')
};

exports.seed = (knex) => {
  return knex('sets').del()
    .then(() => {
      let setPromises = [];

      setsData.forEach(set => {
        setPromises.push(createSet(knex, set));
      });

      return Promise.all(setPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
