import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from '@src/auth/auth.controller';
import { AuthService } from '@src/auth/auth.service';
import passport = require('passport');
import { CryptModule } from '@src/crypt/crypt.module';

@Module({
  imports: [CryptModule],
  controllers: [AuthController],
  providers: [AuthService],
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
