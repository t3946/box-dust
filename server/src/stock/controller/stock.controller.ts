import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from '@src/user/user.service';

const prisma = new PrismaClient();

export async function getUserStock(user_id) {
  return await prisma.box_stock_items.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      stock_item_id: true,
      item: {
        include: {
          image: {
            select: {
              name: true,
            },
          },
          rare: {
            select: {
              slug: true,
            },
          },
        },
      },
      total: true,
    },
  });
}

@Controller('api/stock')
export class StockController {
  constructor(private readonly passwordService: UserService) {}

  @Post('sell')
  public async sell(@Res() res, @Req() req) {
    const stockItem = await prisma.box_stock_items.findUnique({
      where: {
        stock_item_id: req.body.stock_item_id,
      },
      include: {
        item: true,
      },
    });

    const sellNumber = parseInt(req.body.count);

    if (stockItem.total < sellNumber) {
      res.sendStatus(400);
      return;
    }

    if (stockItem.total === sellNumber) {
      await prisma.box_stock_items.delete({
        where: {
          stock_item_id: req.body.stock_item_id,
        },
      });
    } else {
      await prisma.box_stock_items.update({
        where: {
          stock_item_id: req.body.stock_item_id,
        },
        data: {
          total: stockItem.total - sellNumber,
        },
      });
    }

    await prisma.box_users.update({
      where: {
        user_id: req.user.user_id,
      },
      data: {
        balance: req.user.balance + stockItem.item.list_price * sellNumber,
      },
    });

    res.json({ user: req.user, stockItem });
  }

  @Get('get')
  public async get(@Res() res, @Req() req) {
    const stock = await getUserStock(parseInt(req.user.user_id));

    res.json({
      stock,
    });
  }
}

export default StockController;
