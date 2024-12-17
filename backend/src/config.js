require('dotenv').config()


module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  SECRET: process.env.SECRET || 'Any secret',
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET
}

