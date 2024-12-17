const { Router } = require('express')
const { isNotAuthorized, isAuthorized } = require('../utils/auth')
const router = Router()
const passport = require('passport')

router.get('/', isNotAuthorized, passport.authenticate('discord'))

router.get('/redirect', passport.authenticate('discord', {
  successRedirect: 'http://localhost:4200/dashboard',
  failureRedirect: 'http://localhost:4200/home'
}))

router.get('/logout', isAuthorized, (req, res) => {
  
  req.logout((err) => {
    if (err) {
      return next(err); // handle error if needed
    }
    res.redirect('http://localhost:4200/home'); // redirect after logout
  });
  
})


module.exports = router