import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from '@src/user/user.service';
import { StockService } from '@src/stock/stock.service';

const prisma = new PrismaClient();

@Injectable()
export class GameService {
  constructor(
    private readonly userService: UserService,
    private readonly stockService: StockService,
  ) {
  }

  public async play(
    user_id: number,
    box_id: number,
  ): Promise<Record<any, any>> {
    const box = await prisma.boxes.findUnique({
      where: { id: box_id },
      include: {
        box_designs: true,
        box_items: {
          include: {
            cs_items: true,
          },
        },
      },
    });

    // check on user can play this box

    if (!box) {
      throw {
        error: { box_id: 'box not found' },
      };
    } else if (!box.is_active) {
      throw {
        error: { box_id: 'Box is not active. You can\'t play this box.' },
      };
    }
    const user = await this.userService.getUserById(user_id);

    if (user.balance < box.price) {
      throw {
        error: { box_id: 'not enough money' },
      };
    }

    //[START] determine prize
    const r = Math.random();
    let topBorder = 0;
    let prize;

    for (let i = 0; i < box.box_items.length; i++) {
      const item = box.box_items[i];

      topBorder += item.probability;

      if (r <= topBorder) {
        prize = item.cs_items;
        break;
      }
    }
    //[END]

    // update user balance and stock

    await this.userService.update({ balance: user.balance - box.price }, user.user_id);

    await this.stockService.addItem(user_id, prize.id, 1);

    return prize;
  }

  public async sellItem(userId, itemId) {
    const stockItem = await prisma.box_stock_items.findFirst({
      where: {
        user_id: userId,
        item_id: itemId,
      },
    });
    const user = await this.userService.getUserById(userId);
    const item = await prisma.cs_items.findUnique({ where: { id: itemId } });

    if (stockItem.total === 1) {
      await prisma.box_stock_items.delete({ where: { stock_item_id: stockItem.stock_item_id } });
    } else {
      await prisma.box_stock_items.updateMany({
        where: { stock_item_id: stockItem.stock_item_id },
        data: { total: stockItem.total - 1 },
      });
    }

    const newBalance = user.balance + Math.round(item.price_usd * 10);

    await prisma.box_users.update({
      where: {
        user_id: userId,
      },
      data: {
        balance: newBalance,
      },
    });
  }
}
