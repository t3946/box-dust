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
  ) {}

  public async play(
    user_id: number,
    box_id: number,
  ): Promise<Record<any, any>> {
    const box = await prisma.box_boxes.findUnique({
      where: { box_id },
    });

    // check on user can play this box

    if (!box) {
      throw {
        error: { box_id: 'box not found' },
      };
    } else if (!box.is_active) {
      throw {
        error: { box_id: "Box is not active. You can't play this box." },
      };
    }

    const user = await this.userService.getUserById(user_id);

    if (user.balance < box.price) {
      throw {
        error: { box_id: 'not enough money' },
      };
    }

    // get random cheap prize

    const rarity = await prisma.box_rare_statuses.findFirst({
      where: {
        slug: 'frequently',
      },
    });

    const cheapBoxItems = await prisma.box_items.findMany({
      where: {
        box_id,
        rare_status_id: rarity.rare_status_id,
      },
    });

    const prize =
      cheapBoxItems[
        Math.floor(Math.random() * cheapBoxItems.length) % cheapBoxItems.length
      ];

    // update user balance and stock

    await this.userService.update({ balance: user.balance - box.price }, user.user_id);

    await this.stockService.addItem(user_id, prize.item_id, 1);

    return prize;
  }
}
