import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import FHistoryController from './controllers/f-history.controller';
import ReviewsController from './controllers/reviews.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [AppController, FHistoryController, ReviewsController],
  providers: [AppService],
})
export class AppModule {}
