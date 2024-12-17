const { DISCORD_CLIENT_SECRET, DISCORD_CLIENT_ID } = require("../config");

const User = require("../models/User");
const passport = require("passport");
const { Strategy } = require("passport-discord");

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  if(user) done(null, user) // user de req.user
});

passport.use(
  new Strategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: "/auth/redirect",
      scope: ["identify", "guilds"], // Agregar más scopes según sean necesario
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile);

        // existe usuario?
        const userFound = await User.findOne({discordId: profile.id})
        if(userFound) return done (null, userFound)

        const newUser = new User({
          discordId: profile.id,
          username: profile.username,
          guilds: profile.guilds,
        });

        // console.log(newUser)

        await newUser.save()

        done(null, newUser);
      } catch (error) {
        console.log(error)
        return done(error, null)
      }
    }
  )
);
