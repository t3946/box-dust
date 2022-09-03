import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from '@src/user/controller/user.controller';
import { PasswordService } from '@src/user/service/password.service';
import { AuthModule } from '@src/auth/auth.module';
import { MailService } from '@src/app/services/mail.service';
import { HashService } from '@src/user/service/hash.sevice';

const passport = require('passport');

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [PasswordService, MailService, HashService],
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
