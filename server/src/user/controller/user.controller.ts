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
}

export default UserController;
