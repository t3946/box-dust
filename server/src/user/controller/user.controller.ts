import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordService } from '@src/user/service/password.service';

const prisma = new PrismaClient();

@Controller('api/user')
export class UserController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('register')
  public async register(@Res() res, @Req() req) {
    const { email, name, password } = req.body;
    const hashed = await this.passwordService.encryptPassword(password);

    const user = await prisma.box_users.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });

    delete user.password;

    res.json({
      user,
    });
  }

  @Get('stock')
  public async getStock(@Res() res, @Req() req) {
    const stock = await prisma.box_stock_items.findMany({
      where: {
        user_id: parseInt(req.user.user_id),
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

    res.json({
      stock,
    });
  }
}

export default UserController;
