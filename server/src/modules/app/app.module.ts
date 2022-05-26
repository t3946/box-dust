import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import FHistoryController from './controllers/f-history.controller';
import ReviewsController from './controllers/reviews.controller';
import CategoryController from './controllers/category.controller';
import BoxController from './controllers/box.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    FHistoryController,
    ReviewsController,
    CategoryController,
    BoxController,
  ],
  providers: [AppService],
})
export class AppModule {}
