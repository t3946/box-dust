import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import passport = require('passport');
import LocalStrategy = require('passport-local');
import jwt = require('jsonwebtoken');
import passportJwt = require('passport-jwt');
import { CryptService } from '@src/crypt/crypt.service';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private readonly cryptService: CryptService) {
    this.localStrategy();

    this.jwtStrategy();
  }

  private localStrategy(): void {
    const strategyOptions = {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: true,
    };

    passport.use(
      new LocalStrategy(strategyOptions, async (req, login, password, done) => {
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
                    game_id: true,
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

        const isPasswordsMatch = await this.cryptService.checkEquality(
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

  private jwtStrategy(): void {
    const cookieExtractor = (req): string => {
      let token = null;

      if (req && req.cookies) {
        token = req.cookies['auth'];
      }

      return token;
    };

    const opts = {
      jwtFromRequest: passportJwt.ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.SESSION_AUTHORISATION_SECRET,
      algorithms: ['HS256'],
    };

    passport.use(
      new passportJwt.Strategy(opts, async function (jwt_payload, done) {
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
                    game_id: true,
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
}
