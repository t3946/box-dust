import { Controller, Post, Res, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordService } from '@src/user/service/password.service';

const prisma = new PrismaClient();
const { check, validationResult } = require('express-validator/check');

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

  @Post('update')
  public async updateMame(@Res() res, @Req() req) {
    const errors = validationResult(req).array();

    if (errors.length) {
      res.sendStatus(400);
      return;
    }

    const currentUser = await prisma.box_users.findUnique({
      where: {
        user_id: req.user.user_id,
      },
    });

    //check new email for unique
    if (currentUser.email !== req.body.email) {
      const newEmail = req.body.email;

      const user = await prisma.box_users.findFirst({
        where: {
          email: newEmail,
        },
      });

      if (user) {
        res.json({
          errors: { email: 'Пользователь с таким e-mail уже существует' },
        });

        return;
      }
    }

    await prisma.box_users.update({
      where: {
        user_id: req.user.user_id,
      },

      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    res.sendStatus(200);
  }
}

export default UserController;
