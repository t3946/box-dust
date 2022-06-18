import { Module, MiddlewareConsumer } from '@nestjs/common';
import { StockController } from '@src/stock/controller/stock.controller';
import { PasswordService } from '@src/user/service/password.service';
import { AuthModule } from '@src/auth/auth.module';

const passport = require('passport');

@Module({
  imports: [AuthModule],
  controllers: [StockController],
  providers: [PasswordService],
})
export class StockModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        passport.authenticate('jwt', {
          session: false,
        }),
      )
      .forRoutes('/api/stock/*');
  }
}
