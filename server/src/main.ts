import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.use(cookieParser());
  await app.listen(3080);
}

bootstrap();
