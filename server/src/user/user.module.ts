import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from '@src/user/user.controller';
import { UserService } from '@src/user/user.service';
import { AuthModule } from '@src/auth/auth.module';
import { PartnershipModule } from '@src/partnership/partnership.module';
import { MailService } from '@src/app/services/mail.service';
import passport = require('passport');

@Module({
  imports: [AuthModule, PartnershipModule],
  controllers: [UserController],
  providers: [UserService, MailService],
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
