// require Express and Express router
const express = require('express');
const router = express.Router();

// require restaurant model
const restaurant = require('../../models/restaurant');

// create page
router.get('/new', (req, res) => {
  res.render('new');
});

// create
router.post('/', (req, res) => {
  restaurant
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id;
  return restaurant
    .findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});

// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  restaurant
    .findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});

// edit
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  restaurant
    .findByIdAndUpdate(id, updateData)
    .then(() => {
      res.redirect(`/restaurants/${id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// delete page
router.get('/:id/delete', (req, res) => {
  const id = req.params.id;
  return restaurant
    .findById(id)
    .lean()
    .then((restaurant) => res.render('delete', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});



// export router
module.exports = router;
