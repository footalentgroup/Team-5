const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const { MONGO_URI, SECRET } = require('./config')
const cors = require('cors')

const app = express()
require('./strategies/discordStrategy')
require('./strategies/twitchStrategy')

// SETTINGS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// MIDDLEWARES
app.use(session({
  secret: SECRET,
  name: 'Discord-session',
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URI
  }),
  cookie: {
    maxAge: 60000 * 60 * 24, // 1 day
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  origin: 'http://localhost:4200', // Frontend origin
  credentials: true, // Allow sending cookies
}))


// GLOBAL VARIABLES
app.use((req, res, next) => {
  app.locals.user = req.user;
  next()
})


// ROUTES
app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/dashboard', require('./routes/dashboard.routes'))
app.use('/user', require('./routes/userProfile.routes'))
app.use('/', require('./routes/index.routes'))
app.use('/auth/twitch', require('./routes/twitchAuth.routes'))


module.exports = app