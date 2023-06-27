const passport = require("passport");
var GitHubStrategy =  require("passport-github2").Strategy;
const config = require("config");

passport.use(new GitHubStrategy({
    clientID: config.get("github.clientId"),
    clientSecret: config.get("github.secret"),
    callbackURL: `http://${config.get("app.host")}:${config.get("app.port")}/github/callback`
  },
  function(accessToken, refreshToken, profile, done) {
      console.log("here")
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

module.exports = passport;