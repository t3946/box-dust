import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import FHistoryController from './controllers/f-history.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [AppController, FHistoryController],
  providers: [AppService],
})
export class AppModule {}
