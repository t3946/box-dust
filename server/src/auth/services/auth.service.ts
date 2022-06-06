import { Injectable } from '@nestjs/common';
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

@Injectable()
export class AuthService {
  private localStrategy() {
    passport.use(
      new LocalStrategy(function (username, password, done) {
        const token = jwt.sign(
          { foo: 'bar' },
          process.env.SESSION_AUTHORISATION_SECRET,
        );

        done(null, { name: username, auth: 'local', token });
      }),
    );
  }

  private jwtStrategy() {
    const cookieExtractor = function (req) {
      let token = null;

      if (req && req.cookies) {
        token = req.cookies['auth'];
      }

      return token;
    };

    const opts = {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.SESSION_AUTHORISATION_SECRET,
      algorithms: ['HS256'],
    };

    passport.use(
      new JwtStrategy(opts, function (jwt_payload, done) {
        const expiredAt = new Date(
          (jwt_payload.iat + parseInt(process.env.SESSION_EXP_TIME_S)) * 1000,
        );
        const now = new Date();

        //ignore expiration token
        if (expiredAt.getTime() < now.getTime()) {
          return done(null, false);
        }

        console.log({ jwt_payload });
        // User.findOne({id: jwt_payload.sub}, function(err, user) {
        //   if (err) {
        //     return done(err, false);
        //   }
        //   if (user) {
        //     return done(null, user);
        //   } else {
        //     return done(null, false);
        //     // or you could create a new account
        //   }
        // });

        done(null, {
          jwt_payload,
        });
      }),
    );
  }

  constructor() {
    this.localStrategy();

    this.jwtStrategy();
  }
}
