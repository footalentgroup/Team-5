function isAuthorized(req, res, next) {
  if(req.user) {
    next()
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
}

function isNotAuthorized(req, res, next) {
  if(req.user) {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

module.exports = {
  isAuthorized,
  isNotAuthorized
}