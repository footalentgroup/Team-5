const { Router } = require('express');
const { isAuthorized } = require('../utils/auth');
const router = Router()


router.get('/profile', isAuthorized, (req, res) => {
  console.log(req.user)
  res.json(req.user); 
});

module.exports = router