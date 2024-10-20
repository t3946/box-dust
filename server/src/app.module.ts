// import { Module } from '@nestjs/common';
// import { AppController } from '@src/app/controllers/app.controller';
// import ReviewsController from '@src/app/controllers/reviews.controller';
// import CategoryController from '@src/app/controllers/category.controller';
// import BoxController from '@src/app/controllers/box.controller';
// import { AppService } from '@src/app/services/app.service';
// import { StockModule } from '@src/stock/stock.module';
// import { PrizesHistoryModule } from '@src/prizes-history/prizes-history.module';
// import { GameModule } from '@src/game/game.module';
// import { AuthModule } from '@src/auth/auth.module';
// import { PartnershipModule } from '@src/partnership/partnership.module';
//
// @Module({
//   imports: [
//     GameModule,
//     StockModule,
//     PrizesHistoryModule,
//     AuthModule,
//     PartnershipModule,
//   ],
//   controllers: [
//     AppController,
//     ReviewsController,
//     CategoryController,
//     BoxController,
//   ],
//   providers: [AppService],
// })
// export class AppModule {}




import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}