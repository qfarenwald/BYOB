
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('themes', function(table) {
      table.increments('inc_id').primary();
      table.integer('id');
      table.unique('id');
      table.string('name');
      table.integer('parent_id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('sets', function(table) {
      table.increments('inc_id').primary();
      table.string('set_num');
      table.string('name');
      table.integer('year');
      table.integer('theme_id').unsigned();
      table.foreign('theme_id').references('themes.id');
      table.integer('num_parts');
      table.timestamps(true, true);
    })
  ])
};
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('sets'),
    knex.schema.dropTable('themes')
  ])
};
