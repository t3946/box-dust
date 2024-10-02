import { MiddlewareConsumer, Module } from '@nestjs/common';
import passport = require('passport');
import { GameService } from './game.service';
import { StockModule } from '@src/stock/stock.module';
import { GameController } from './game.controller';

@Module({
  imports: [StockModule],
  providers: [GameService],
  exports: [GameService],
  controllers: [GameController],
})
export class GameModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        passport.authenticate('jwt', {
          session: false,
        }),
      )
      .forRoutes('/api/game/*');
  }
}
