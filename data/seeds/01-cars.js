// STRETCH
exports.seed = async function(knex) {
    await knex('cars').truncate()
    await knex('cars').insert([
      {vin: '12345678901',make: 'KIA', model: 'Optima', mileage: 150000, title: 'clean', transmission: 'automatic'  },
      {vin: '76474686876',make: 'Hyundai', model: 'Santa Fe', mileage: 53000, title: 'clean', transmission: 'automatic'},
      
    ]);
  };