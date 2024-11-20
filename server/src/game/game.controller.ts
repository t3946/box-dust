import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { User } from '@src/auth/decorators/user.decorator';
import { GameService } from '@src/game/game.service';
import { UserService } from '@src/user/user.service';
import { StockService } from '@src/stock/stock.service';

@Controller('api/game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly stockService: StockService,
  ) {}

  @Get('play')
  @HttpCode(HttpStatus.OK)
  public async play(
    @User() user: Record<any, any>,
    @Query('boxId') boxId: string,
  ): Promise<Record<any, any>> {
    try {
      const prize = await this.gameService.play(user.user_id, parseInt(boxId));
      const { balance: newBalance } = await this.userService.getUserById(
        user.user_id,
      );

      return {
        prize,
        newBalance,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('sell-item')
  @HttpCode(HttpStatus.OK)
  public async sellItem(
    @User() user: Record<any, any>,
    @Query('id') itemId: number,
  ) {
    await this.gameService.sellItem(user.user_id, itemId);

    const { balance: newBalance } = await this.userService.getUserById(
      user.user_id,
    );

    return {
      user: {
        balance: newBalance,
      },
    };
  }
}
