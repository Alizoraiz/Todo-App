const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID: string = "387615387883-7kiihi85np2c7baajdpo0tv1aiai75si.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET: string = "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";


passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/callback",
    passReqToCallback   : true
  },
  function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user: any, done: any){
    done(null, user)
});

passport.deserializeUser(function(user: any, done: any){
    done(null, user)
});
