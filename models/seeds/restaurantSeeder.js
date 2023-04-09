const bcrypt = require('bcryptjs')
const restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
// require mongoose config
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')

//dummy user data
const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  console.log('running restaurantSeeder.js ...')
  bcrypt
    .genSalt(10)
    .then(salt => 
      bcrypt.hash(SEED_USER[0].password, salt))
    .then(hash => 
      User.create({
      name: SEED_USER[0].name,
      email: SEED_USER[0].email,
      password: hash
    })
    )
    .then(user => {
      const userId = user._id
      for(let i =0; i<3; i++){
        Restaurant.create({...restaurantList[i], userId})
      }
    })
    .then(console.log('user1 set done'))

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[1].password, salt))
    .then(hash => User.create({
      name: SEED_USER[1].name,
      email: SEED_USER[1].email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (let i = 3; i < 6; i++) {
        Restaurant.create({ ...restaurantList[i], userId })
      }
    })
    .then(() => {
      console.log('user2 set done')
    })
});
