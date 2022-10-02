import { Module } from '@nestjs/common';
import { AppController } from '@src/app/controllers/app.controller';
import ReviewsController from '@src/app/controllers/reviews.controller';
import CategoryController from '@src/app/controllers/category.controller';
import BoxController from '@src/app/controllers/box.controller';
import { AppService } from '@src/app/services/app.service';
import { UserModule } from '@src/user/user.module';
import { StockModule } from '@src/stock/stock.module';
import { PrizesHistoryModule } from '@src/prizes-history/prizes-history.module';

@Module({
  imports: [UserModule, StockModule, PrizesHistoryModule],
  controllers: [
    AppController,
    ReviewsController,
    CategoryController,
    BoxController,
  ],
  providers: [AppService],
})
export class AppModule {}
