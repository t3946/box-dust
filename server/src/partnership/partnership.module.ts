import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PartnershipController } from '@src/partnership/controller/partnership.controller';

const passport = require('passport');
const prisma = new PrismaClient();

@Module({
  controllers: [PartnershipController],
})
export class PartnershipModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        passport.authenticate('jwt', {
          session: false,
        }),
      )
      .exclude('/api/partnership/get')
      .forRoutes('/api/partnership/*');
  }
}
