import { AuthService } from '@src/auth/services/auth.service';
import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordService } from '@src/user/service/password.service';
import { getUserStock } from '@src/stock/controller/stock.controller';

const prisma = new PrismaClient();

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  @Get('info')
  public getUserInfo(@Res() res, @Req() req) {
    res.json({
      user: req.user,
    });
  }

  @Post('login')
  public async login(@Res() res, @Req() req) {
    if (req.user.errors) {
      return res.json({ errors: req.user.errors });
    }

    res.cookie('auth', req.user.authToken);
    const stock = await getUserStock(req.user.user.user_id);
    res.json({ user: req.user.user, stock });
  }
}

export default AuthController;
