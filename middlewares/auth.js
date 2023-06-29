const passport = require("passport");
var GitHubStrategy =  require("passport-github2").Strategy;
const config = require("config");
const User = require('../models/mysql/user');
const { db } = require('./mysql')

passport.use(new GitHubStrategy({
    clientID: config.get("github.clientId"),
    clientSecret: config.get("github.secret"),
    callbackURL: `http://${config.get("app.host")}:${config.get("app.port")}/github/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const user = new User(db);
        //console.log(profile.id.toString());
        let authenticatedUser = await user.findByGithubid({
            gitHubID: profile.id.toString()
        })
        if (authenticatedUser.length === 0) {
            const insert = await user.add({
                gitHubID: profile.id.toString()
            })
            //console.log(insert.insertId);
            authenticatedUser = await user.findByPK({
                id: insert.insertId
            })
        }
        //console.log(authenticatedUser[0]);
        return done(null, authenticatedUser[0]);
    } catch(error) {
        return done(error)
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;