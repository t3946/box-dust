import { Controller, Get, Res, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const findHistorySelectFields = {
  f_history_id: true,
  user: {
    select: {
      f_user_id: true,
      name: true,
    },
  },
  box: {
    select: {
      box_id: true,
      name: true,
      small_image: {
        select: {
          name: true,
        },
      },
    },
  },
  item: {
    select: {
      item_id: true,
      name: true,
      image: true,
    },
  },
};

@Controller('api/prizes-history')
export class PrizesHistoryController {
  @Get('get')
  public async get(@Res() res, @Req() req) {
    // const take = parseInt(req.query.take);
    // const history = await prisma.box_f_history.findMany({
    //   take,
    //   select: findHistorySelectFields,
    //   orderBy: {
    //     f_history_id: 'desc',
    //   },
    // });
    //
    // res.json({ history });
  }

  @Get('get-last')
  public async getLast(@Res() res) {
    // const lastPrize = (
    //   await prisma.box_f_history.findMany({
    //     select: findHistorySelectFields,
    //     orderBy: {
    //       f_history_id: 'desc',
    //     },
    //     take: 1,
    //   })
    // )[0];
    //
    // res.status(200).json({ lastPrize });
  }
}

export default PrizesHistoryController;
