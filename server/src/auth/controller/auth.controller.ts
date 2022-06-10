import { AuthService } from '@src/auth/services/auth.service';
import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordService } from '@src/user/service/password.service';

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
    console.log('login successful');
    res.cookie('auth', req.user.authToken);
    // res.header('Access-Control-Allow-Headers', '*');
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Credentials', 'true');
    res.json({ user: req.user.user });
  }
}

export default AuthController;
