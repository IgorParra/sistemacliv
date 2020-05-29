
exports.up = function(knex) {
    return knex.schema.createTable('task', function(table) {
        table.increments().primary();
        table.string('descri').notNullable();
        table.string('requester').notNullable();
        table.string('executant').notNullable();
        table.integer('status').notNullable();
        table.integer('urgency').notNullable();
        table.integer('date').notNullable();


        
        
        table.foreign('requester').references('id').inTable('user');
        table.foreign('executant').references('id').inTable('user');
        table.foreign('urgency').references('id').inTable('urgency');
        table.foreign('status').references('id').inTable('status');


    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('task') 
  
};
