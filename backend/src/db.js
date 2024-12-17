const { connect } = require('mongoose')
const { MONGO_URI } = require('./config')

connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))