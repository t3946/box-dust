import { Module, MiddlewareConsumer } from '@nestjs/common';
import passport = require('passport');
import { CryptService } from '@src/crypt/crypt.service';

@Module({
  providers: [CryptService],
  exports: [CryptService],
})
export class CryptModule {
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
