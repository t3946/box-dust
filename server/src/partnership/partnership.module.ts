import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PartnershipController } from '@src/partnership/partnership.controller';
import { PartnershipService } from './partnership.service';
import passport = require('passport');

@Module({
  controllers: [PartnershipController],
  providers: [PartnershipService],
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
