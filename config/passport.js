const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, 
    (req, email, password, done) => {
      User.findOne({email})
        .then(user => {
          if (!user) {
            return done(null, false, { message: '使用者不存在'})
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false,  {message: 'Email or Passport incorrect'})
            }
            return done(null, user)
          })
        })
        .catch(err => done(err, false))
    }))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  
  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}