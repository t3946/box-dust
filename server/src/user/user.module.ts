import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from '@src/user/controller/user.controller';
import { PasswordService } from '@src/user/service/password.service';
import { AuthModule } from '@src/auth/auth.module';

const passport = require('passport');

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [PasswordService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        passport.authenticate('jwt', {
          session: false,
        }),
      )
      .exclude('/api/user/register')
      .forRoutes('/api/user/*');
  }
}
