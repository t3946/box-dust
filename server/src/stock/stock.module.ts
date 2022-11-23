import { Module, MiddlewareConsumer } from '@nestjs/common';
import { StockController } from '@src/stock/stock.controller';
import { UserModule } from '@src/user/user.module';
import { StockService } from '@src/stock/stock.service';
import passport = require('passport');

@Module({
  imports: [UserModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [UserModule, StockService],
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
