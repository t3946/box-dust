import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';

const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

@Controller('api/f-history')
export class FHistoryController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  async getHistory(@Res() res) {
    const history = await prisma.box_f_history.findMany({
      take: 100,
      select: {
        user: {
          select: {
            f_user_id: true,
            name: true,
          },
        },
        box: {
          select: {
            box_id: true,
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
            image: true,
          },
        },
      },
    });

    res.json({ history });
  }

  @Get('generate')
  async generateHistory(@Res() res) {
    const allBoxes = await prisma.box_boxes.findMany({
      include: {
        box_items: true,
      },
    });
    const boxes = allBoxes.filter((box) => box.box_items.length > 0);
    const users = await prisma.box_f_users.findMany();

    function getRandom() {
      const randomBoxIndex = Math.floor(Math.random() * boxes.length);
      const randomBox = boxes[randomBoxIndex];
      const randomItemIndex = Math.floor(
        Math.random() * randomBox.box_items.length,
      );
      const randomBoxItem = randomBox.box_items[randomItemIndex];
      const randomUsers = users[Math.floor(Math.random() * users.length)];
      return {
        box_id: randomBox.box_id,
        item_id: randomBoxItem.item_id,
        f_user_id: randomUsers.f_user_id,
      };
    }

    for (let i = 0; i < 80; i++) {
      const data = getRandom();

      await prisma.box_f_history.create({
        data,
      });
    }

    res.sendStatus(200);
  }
}

export default FHistoryController;
