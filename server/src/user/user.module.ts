import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from '@src/user/user.controller';
import passport = require('passport');
import { CryptModule } from '@src/crypt/crypt.module';
import { UserService } from '@src/user/user.service';
import { MailModule } from '@src/mail/mail.module';

@Module({
  imports: [
    CryptModule,
    MailModule,
    /*, AuthModule PartnershipModule, StockModule, PrizesHistoryModule*/
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        passport.authenticate('jwt', {
          session: false,
        }),
      )
      .exclude(
        '/api/user/register',
        '/api/user/register/(.*)',
        '/api/user/register-confirm',
        '/api/user/send-confirm-email',
      )
      .forRoutes('/api/user/*');
  }
}
