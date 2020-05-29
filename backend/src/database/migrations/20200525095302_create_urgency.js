
exports.up = function(knex) {
    return knex.schema.createTable('urgency',function (table){
        table.increments('id');
        table.string('descri').notNullable();
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('urgency');

};
