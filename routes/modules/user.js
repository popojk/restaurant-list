const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

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
    req.flash('success_msg', '已成功登出')
    res.redirect('/user/login')
  })
})

//get register page
router.get('/register', (req, res) => {
  res.render('register')
})

//register function
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword} = req.body
  const errors = []
  if( !email || !password || !confirmPassword){
    errors.push({message: '所有欄位都是必須'})
  }

  if(password !== confirmPassword) {
    errors.push({message: '密碼與確認密碼不相符'})
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({email})
    .then(user => {
      //check if user already registered
      if(user){
        errors.push({message: '這個Email已被註冊'})
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        //if user not yet registered, write into the db
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => 
            User.create({
              name,
              email,
              password: hash
            }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))

      }
    })
    .catch(err => console.log(err))

})

module.exports = router