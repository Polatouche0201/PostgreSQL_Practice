
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.increments('id').unsigned().primary();
      table.string('description');
      table.dateTime('date_achieved').notNull();
      //table.timestamps('');
    })
  ])
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};