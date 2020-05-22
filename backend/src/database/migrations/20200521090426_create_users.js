
exports.up = function(knex) {
    return knex.schema.createTable('user',function(table){
        table.string('id').unique().primary();
        table.string('name').unique().notNullable();
        table.string('email').unique().notNullable();
        table.integer('group').notNullable();
        table.boolean('executant');
        table.integer('sector').notNullable();


        table.foreign('group').references('id').inTable('group');
        table.foreign('sector').references('id').inTable('sector');
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('user') 
};


