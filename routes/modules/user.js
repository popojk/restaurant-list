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

//logout function
router.get('/logout', (req, res) => {
  req.logOut(function (err) {
    if (err) { return next(err) }
    res.redirect('/user/login')
  })
})

module.exports = router