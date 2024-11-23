import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from '@src/user/user.service';

const prisma = new PrismaClient();

@Injectable()
export class StockService {
  constructor(private userService: UserService) {}

  public async getUserStock(user_id: number): Promise<Record<any, any>> {
    return await prisma.box_stock_items.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        stock_item_id: true,
        item: true,
        total: true,
      },
    });
  }

  public async sellItem(
    user_id: number,
    stock_item_id: number,
    count: number,
  ): Promise<void> {
    const stockItem = await prisma.box_stock_items.findFirst({
      where: {
        stock_item_id,
      },
      include: {
        item: true,
      },
    });

    // check sell available

    if (!stockItem) {
      throw { error: 'stock item not found' };
    } else if (stockItem.total < count) {
      throw { error: 'count more than total items' };
    }

    // decrease items in stock

    if (stockItem.total === count) {
      await prisma.box_stock_items.delete({
        where: {
          stock_item_id,
        },
      });
    } else {
      await prisma.box_stock_items.update({
        where: {
          stock_item_id,
        },
        data: {
          total: stockItem.total - count,
        },
      });
    }

    // update user balance

    const { balance: oldBalance } = await this.userService.getUserById(user_id);
    const sellRevenue = stockItem.item.price_usd * count;

    await this.userService.update(
      { balance: oldBalance + sellRevenue },
      user_id,
    );
  }

  public async addItem(
    user_id: number,
    item_id: number,
    count: number,
  ): Promise<void> {
    const stockItem = await prisma.box_stock_items.findFirst({
      where: {
        user_id,
        item_id,
      },
    });

    if (stockItem) {
      await prisma.box_stock_items.update({
        where: {
          stock_item_id: stockItem.stock_item_id,
        },
        data: {
          total: stockItem.total + count,
        },
      });
    } else {
      await prisma.box_stock_items.create({
        data: {
          user_id,
          item_id,
          total: count,
        },
      });
    }
  }
}
