import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '@src/auth/decorators/user.decorator';
import { StockService } from '@src/stock/stock.service';
import SellItemDto from '@src/stock/dto/sell-item.dto';

const prisma = new PrismaClient();

export async function getUserStock(user_id) {
  return await prisma.box_stock_items.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      stock_item_id: true,
      item: true,
      total: true,
    },
  });
}

@Controller('api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('sell')
  @HttpCode(HttpStatus.OK)
  public async sell(
    @User() user: Record<any, any>,
    @Query() sellItemDto: SellItemDto,
  ): Promise<void> {
    const { stock_item_id, count } = sellItemDto;

    try {
      await this.stockService.sellItem(
        user.user_id,
        parseInt(stock_item_id),
        parseInt(count),
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }

  @Get('get')
  public async get(@User() user: Record<any, any>): Promise<Record<any, any>> {
    return {
      stock: await this.stockService.getUserStock(user.user_id),
    };
  }
}

export default StockController;
