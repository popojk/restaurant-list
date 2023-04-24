// require Express and Express router
const express = require('express')
const router = express.Router()

// require modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const user = require('./modules/user')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, home)

// export router
module.exports = router
