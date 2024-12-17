const { Schema, model } = require("mongoose");


const twitchUserSchema = new Schema({
  twitchId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: false },
  accessToken: { type: String, required: true },
}, {
  timestamps: true
})

module.exports = model('TwitchUser', twitchUserSchema)