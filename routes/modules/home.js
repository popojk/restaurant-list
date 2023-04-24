// require Express and Express router
const express = require('express')
const router = express.Router()

// require restaurant model
const restaurant = require('../../models/restaurant')

// index
router.get('/', (req, res) => {
  try {
    const userId = req.user._id
    restaurant
      .find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then((restaurants) => res.render('index', { restaurants }))
      .catch((error) => console.error(error))
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

// delete
router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id
    restaurant
      .findByIdAndDelete(id)
      .then(() => res.redirect('/'))
      .catch((error) => console.log(error))
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

// export router
module.exports = router
