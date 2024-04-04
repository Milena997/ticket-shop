const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const authModel = require('./model/authModel');


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        let user = await authModel.findOne({ _id: jwt_payload.userId })

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};