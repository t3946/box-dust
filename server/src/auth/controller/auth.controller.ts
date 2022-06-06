import { AppService } from '@src/app/services/app.service';
import { AuthService } from '@src/auth/services/auth.service';
import { Controller, Get, Post, Res, Req } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('info')
  public getUserInfo(@Res() res, @Req() req) {
    res.json({
      user: req.user,
    });
  }

  @Post('login')
  public login(@Res() res, @Req() req) {
    res.cookie('auth', req.user.token);
    res.json({
      user: req.user,
    });
  }
}

export default AuthController;
