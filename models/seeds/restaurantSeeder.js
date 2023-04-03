// require restaurant model
const restaurant = require('../restaurant');
const restaurantList = require('../../restaurant.json').results;
// require mongoose config
const db = require('../../config/mongoose');

db.once('open', () => {
  console.log('running restaurantSeeder.js ...');

  restaurant
    .create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!');
      db.close();
    })
    .catch((err) => console.log(err));
});
