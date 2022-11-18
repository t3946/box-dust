import { AuthService } from '@src/auth/auth.service';
import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { getUserStock } from '@src/stock/stock.controller';
import { User } from '@src/auth/decorators/user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: UserService,
  ) {}

  @Get('info')
  public getUserInfo(@User() user: Record<any, any>): Record<any, any> {
    return {
      user,
    };
  }

  @Post('login')
  public async login(@Res() res, @Req() req): Promise<Record<any, any>> {
    if (req.user.errors) {
      return res.json({ errors: req.user.errors });
    }

    res.cookie('auth', req.user.authToken);
    const stock = await getUserStock(req.user.user.user_id);
    res.json({ user: req.user.user, stock });
  }
}

export default AuthController;
