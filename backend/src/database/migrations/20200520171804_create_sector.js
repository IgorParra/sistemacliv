
exports.up = function(knex) {
   return knex.schema.createTable('sector', function(table) {
       table.increments().primary().unique();
       table.string('name').unique().notNullable();
   });
};

exports.down = function(knex) {
    return knex.schema.dropTable('sector') 
};

