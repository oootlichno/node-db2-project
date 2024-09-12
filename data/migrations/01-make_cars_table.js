exports.up = function (knex) {
return knex.schema.createTable('cars', car => {
car.increments();
car.text('vin', 20).unique().notNullable();
car.text('make', 100).notNullable();
car.text('model', 50).notNullable();
car.decimal('mileage').unsigned().notNullable();
car.text('title', 50);
car.text('transmission');

})
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
