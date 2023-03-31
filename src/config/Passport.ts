import passport from 'passport';
import passportJwt from 'passport-jwt'
import User from '../models/User';

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET_KEY || 'secret',
    },
    function (jwtToken, done) {
      User.findOne({ email: jwtToken.email }, function (err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(undefined, user, jwtToken)
        } else {
          return done(undefined, false)
        }
      })
    }
  )
)