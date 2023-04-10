const express = require('express')
const router = express.Router()
const passport = require('passport')

//get login page
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

module.exports = router