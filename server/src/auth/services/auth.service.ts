import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordService } from '@src/user/service/password.service';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  private localStrategy() {
    const strategyOptions = {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: true,
    };

    passport.use(
      new LocalStrategy(strategyOptions, async function (
        req,
        login,
        password,
        done,
      ) {
        const user = await prisma.box_users.findFirst({
          where: {
            email: login,
            confirmed: true,
          },
          include: {
            partnership: true,
            referrals: {
              select: {
                user_id: true,
                name: true,
                last_login: true,
                created: true,
                games: {
                  select: {
                    game_price: true,
                    prize_price: true,
                    created: true,
                    item: {
                      select: { name: true },
                    },
                    user: {
                      select: { user_id: true, name: true },
                    },
                  },
                },
              },
            },
          },
        });

        if (!user || !user.confirmed) {
          return done(null, {
            errors: { login: 'Пользователь с таким email не найден' },
          });
        }

        const passwordService = new PasswordService();
        const isPasswordsMatch = await passwordService.comparePassword(
          password,
          user.password,
        );

        if (!isPasswordsMatch) {
          return done(null, {
            errors: { password: 'Неверный пароль' },
          });
        }

        const token = jwt.sign(
          {
            user: {
              user_id: user.user_id,
            },
          },
          process.env.SESSION_AUTHORISATION_SECRET,
        );

        delete user.password;

        done(null, { user, authToken: token });
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
      new JwtStrategy(opts, async function (jwt_payload, done) {
        const expiredAt = new Date(
          (jwt_payload.iat + parseInt(process.env.SESSION_EXP_TIME_S)) * 1000,
        );
        const now = new Date();

        //ignore expiration token
        if (expiredAt.getTime() < now.getTime()) {
          return done(null, false);
        }

        const user = await prisma.box_users.findFirst({
          where: {
            user_id: jwt_payload.user.user_id,
            confirmed: true,
          },
          include: {
            partnership: true,
            referrals: {
              select: {
                user_id: true,
                name: true,
                last_login: true,
                created: true,
                games: {
                  select: {
                    game_price: true,
                    prize_price: true,
                    created: true,
                    item: {
                      select: { name: true },
                    },
                    user: {
                      select: { user_id: true, name: true },
                    },
                  },
                },
              },
            },
          },
        });

        //user from session doesn't exits
        if (!user) {
          return done(null, false);
        }

        delete user.password;

        done(null, user);
      }),
    );
  }

  constructor() {
    this.localStrategy();

    this.jwtStrategy();
  }
}
