// require Express and Express router
const express = require('express')
const router = express.Router()

// require restaurant model
const restaurant = require('../../models/restaurant')

// search
router.get('/', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }

  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  const sort = req.query.sort
  let sortKeyword = { _id: 'asc' }

  if (sort === 'A > Z') {
    sortKeyword = { name: 'asc' }
  } else if (sort === 'Z > A') {
    sortKeyword = { name: 'desc' }
  } else if (sort === '類別') {
    sortKeyword = { category: 'asc' }
  } else if (sort === '地區') {
    sortKeyword = { location: 'asc' }
  }

  let sortWord = sort;

  if (!sort.includes(' (目前的排序)')) {
    sortWord = sort + ' (目前的排序)'
  }

  restaurant
    .find({userId})
    .lean()
    .sort(sortKeyword)
    .then((restaurantsData) => {
      const restaurants = restaurantsData.filter((data) => {
        return (
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
        );
      });
      res.render('index', {
        restaurants: restaurants,
        keyword: keyword,
        sort: sortWord,
      });
    })
    .catch((error) => console.log(error))
});

// export router
module.exports = router;
