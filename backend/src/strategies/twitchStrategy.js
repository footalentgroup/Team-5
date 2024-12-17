const { TWITCH_CLIENT_SECRET, TWITCH_CLIENT_ID } = require("../config");
const TwitchUser = require('../models/TwitchUser');
const passport = require("passport");
const OAuth2Strategy = require('passport-oauth2');

// Configura Passport con la estrategia OAuth2 para Twitch
passport.use(
  'twitch',
  new OAuth2Strategy(
    {
      authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
      tokenURL: 'https://id.twitch.tv/oauth2/token',
      clientID: TWITCH_CLIENT_ID, // Agrega tu Client ID aquí
      clientSecret: TWITCH_CLIENT_SECRET, // Agrega tu Client Secret aquí
      callbackURL: 'http://localhost:3000/auth/twitch/callback', // URL configurada en Twitch Developer Console
      scope: ['user:read:email'], // Scopes que necesitas
    },
    async (accessToken, refreshToken, params, done) => {
      try {
        // Fetch user profile from Twitch API
        const response = await fetch('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Twitch profile');
        }

        const data = await response.json();
        const profile = data.data[0]; // Twitch API returns an array under `data`

        console.log(profile);

        // Check if user exists in the database
        const userFound = await TwitchUser.findOne({ twitchId: profile.id });
        if (userFound) return done(null, userFound);

        // Save new user
        const newUser = new TwitchUser({
          twitchId: profile.id,
          displayName: profile.display_name,
          email: profile.email,
          accessToken,
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        console.error(error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await TwitchUser.findById(id);
    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});