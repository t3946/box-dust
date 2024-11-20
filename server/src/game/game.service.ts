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
    const box = await prisma.box_boxes.findUnique({
      where: { box_id },
      include: {
        cs_items: {
          include: {
            item: true,
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
    const randomIndex = Math.floor(Math.random() * box.cs_items.length) % box.cs_items.length;
    const prize = box.cs_items[randomIndex].item;
    //[END]

    // update user balance and stock

    await this.userService.update({ balance: user.balance - box.price }, user.user_id);

    await this.stockService.addItem(user_id, prize.id, 1);

    return prize;
  }
}
