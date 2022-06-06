import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from '@src/app/services/app.service';

const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

@Controller('api/user')
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
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
      },
    });

    res.json({ history });
  }
}

export default UserController;
