// require Express and Express router
const express = require('express');
const router = express.Router();

// require restaurant model
const restaurant = require('../../models/restaurant');

// search
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  restaurant
    .find()
    .lean()
    .then((restaurantsData) => {
      const restaurants = restaurantsData.filter((data) => {
        return (
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
        );
      });
      res.render('index', { restaurants: restaurants, keyword: keyword });
    })
    .catch((error) => console.log(error));
});

// export router
module.exports = router;
