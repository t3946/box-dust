import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from '@src/auth/auth.controller';
import { AppService } from '@src/app/services/app.service';
import { AuthService } from '@src/auth/auth.service';
import { UserService } from '@src/user/user.service';
const passport = require('passport');

@Module({
  controllers: [AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        passport.authenticate('local', {
          failureRedirect: '/login',
          session: false,
        }),
      )
      .forRoutes('/api/auth/login');

    consumer
      .apply(
        passport.authenticate('jwt', {
          session: false,
        }),
      )
      .forRoutes('/api/auth/info');
  }
}
