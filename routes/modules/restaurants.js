// require Express and Express router
const express = require('express')
const router = express.Router()

// require restaurant model
const restaurant = require('../../models/restaurant')

// create page
router.get('/new', (req, res) => {
  res.render('new')
})

// create
router.post('/', (req, res) => {
  try {
    const userId = req.user._id
    restaurant
      .create({ ...req.body, userId })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

// detail
router.get('/:id', (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    return restaurant
      .findOne({ _id, userId })
      .lean()
      .then((restaurant) => res.render('detail', { restaurant: restaurant }))
      .catch((error) => console.log(error))
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

// edit page
router.get('/:id/edit', (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    restaurant
      .findOne({ _id, userId })
      .lean()
      .then((restaurant) => res.render('edit', { restaurant: restaurant }))
      .catch((error) => console.log(error))
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

// edit
router.put('/:id', (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const updateData = req.body
    restaurant
      .findOneAndUpdate({ _id, userId }, updateData)
      .then(() => {
        res.redirect(`/restaurants/${_id}`)
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

// delete page
router.get('/:id/delete', (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    return restaurant
      .findOne({ _id, userId })
      .lean()
      .then((restaurant) => res.render('delete', { restaurant: restaurant }))
      .catch((error) => console.log(error))
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

// export router
module.exports = router;
