import { Module } from '@nestjs/common';
import { PrizesHistoryController } from '@src/prizes-history/controller/prizes-history.controller';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Module({
  controllers: [PrizesHistoryController],
})
export class PrizesHistoryModule {
  constructor() {
    //fake history generation
    const UPDATE_FAKE_HISTORY_INTERVAL = 10_000;

    setInterval(async () => {
      const MAX_FAKE_HISTORY_RECORDS = 15;
      const historyRecordsCount = await prisma.box_f_history.count();

      if (historyRecordsCount >= MAX_FAKE_HISTORY_RECORDS) {
        const lastRecord: Record<any, any> = (
          await prisma.box_f_history.findMany({
            orderBy: {
              f_history_id: 'desc',
            },
            take: 1,
            skip: MAX_FAKE_HISTORY_RECORDS - 1,
          })
        )[0];

        await prisma.box_f_history.deleteMany({
          where: {
            f_history_id: {
              lte: lastRecord.f_history_id,
            },
          },
        });
      }

      const randomFakeUser: Record<any, any> = (
        await prisma.$queryRaw`SELECT * FROM box_dust.box_f_users ORDER BY RAND() LIMIT 1`
      )[0];
      const randomPrize: Record<any, any> = (
        await prisma.$queryRaw`SELECT * FROM box_items ORDER BY RAND() LIMIT 1`
      )[0];

      // await prisma.box_f_history.create({
      //   data: {
      //     f_user_id: randomFakeUser?.f_user_id,
      //     box_id: randomPrize?.box_id,
      //     item_id: randomPrize?.item_id,
      //   },
      // });
    }, UPDATE_FAKE_HISTORY_INTERVAL);
  }
}
