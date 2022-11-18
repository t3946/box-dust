import { Module, MiddlewareConsumer } from '@nestjs/common';
import { StockController } from '@src/stock/stock.controller';
import { UserService } from '@src/user/user.service';
import { AuthModule } from '@src/auth/auth.module';
import { StockService } from './stock.service';

const passport = require('passport');

@Module({
  imports: [AuthModule],
  controllers: [StockController],
  providers: [UserService, StockService],
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
