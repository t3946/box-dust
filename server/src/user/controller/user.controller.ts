import { Controller, Post, Get, Res, Req, Body, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordService } from '@src/user/service/password.service';
import { MailService } from '@src/app/services/mail.service';
import { HashService } from '@src/user/service/hash.sevice';
import ConfirmEmail from '@src/app/services/templates/ConfirmEmail';
import getBaseUrl from '@src/utils/baseUrl';
import getEmail from '@src/utils/getEmail';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ConfirmationCode } from '@src/utils/ConfirmationCode';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { getUserStock } from '@src/stock/controller/stock.controller';
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

//These messages need for debug. User messages stores only on in client form
class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(32, {
    message:
      'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name: string;
  @IsNotEmpty()
  password: string;
  @IsEmail()
  email: string;
}

class ConfirmEmailDto {
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  email: string;
}

@Controller('api/user')
export class UserController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
    private readonly hashService: HashService,
  ) {}

  @Post('register')
  //registration by login/password
  public async register(
    @Res() res,
    @Req() req,
    @Body() createUserDto: CreateUserDto,
  ) {
    const { email, name, password } = createUserDto;
    const hashed = await this.passwordService.encryptPassword(password);

    //check email unique
    const user = await prisma.box_users.findFirst({
      where: { email },
    });

    if (user) {
      res.json({
        errors: { email: 'Пользователь с таким email уже зарегистрирован' },
      });

      return;
    }

    await prisma.box_users.create({
      data: {
        name,
        email,
        password: hashed,
        confirmed: false,
      },
    });

    res.sendStatus(200);
  }

  @Post('update')
  public async updateName(@Res() res, @Req() req) {
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

  private confirmEmailSalt = 'confirm-email-salt';

  private async sendRegisterConfirmEmail(userId, code) {
    //send new account confirmation email
    //id to get user and hash for security
    const text = 'Код подтверждения регистрации: ' + code;
    const html = ConfirmEmail({
      supportEmail: getEmail('admin'),
      confirmationCode: code,
      logoUrl:
        'https://lh3.googleusercontent.com/fife/AAbDypCq56D06yVaxTL4AHn--F1yDJtWkz6tbX5xFR5VrZeaqZMdf163aK6n3y7LgGxkzSe1zfmJNYzekcOo5pT9xy6eQbmVawWgESKcBsjejvkctvKYPfUWJ3pFUjoP-fAdc8Tcl8fe8mEMyZEt6JvwAF-UJRtaXk_iPnUUnmZEQELsmiJeM-j7XXKMvvWpTzMdtOPYC4awqyV0p92Ur-iwbBL1dxatFXisBIMJzMW8ImvTDUBdQv5K_Ud6ka8H-Bf_Vk4TYAuzpAjhiRUqd9svLGwBKN5INdQTO37nIQjjrQENG8BOjSd4-L0ZyqJZMa_5WW_2ZmF5ySEAf5Xgajks9yaL0qqz15R2Tl3xnIb3hJUA2g-gTQJPKxClsr9DZOR8ormvVvKobbzatevh0jqiucfTi2zLjn2NziZNp9C0W7rcIXb4UrXrtfTP3Hyhyl1C--PT4oA7XCg8_LBDVbRuk-MY6aLYimsM8bNx0nVBT-R7Iq-RLmlO-DVvImW7AnZawUFJWX4OFi7fZ3da4e256IyJxTcMAn1ehLQhgPGsVeWXHwU8ezkSA2YjuLojiOnB4fX1TmRk1bgmPgy7rVrsLlM29hvYlTbt-lwIZHcs4mzK0fGRfisQj3yBgh0cu0yz-cXpayLM2Rx-jnHPqSWhNZW3UghAYxOaqTz9OivjxEnM0Dz0l32GxLG9hxFRStRCiknerLrYTaKifTUSYyiQ8ncAOMEbPM6HD7EQ9TQ4fITuaczbFACNqaAtt0BykDUZXfwGKC8Nb4EtqQQ6AFdsMN9s_bbyoPa1qf7BBb5-5frFJkbl4N8ESPROP86H_qov-twn3Nnd-dQv7v_z-sMD9smES6WFzfSwmCHxGod-XQnV38IMAltjSFavQYYfIRXYvwVr_g16DKdz15DTUrVx5IKtR2Fk1imXZbW0Ik4NW2qj4LkujzEFNDBxfvDu8ai3Eiv_CzGzduP907ibThZdlSrPuGAPLQAW6gM2QrZ5KclAgImGbghwX8aV1ewj80muwKkQdnhodHLw_oBUjWDqQgoQsyxeuzeXR9_zWxMuoeeToer6267I6gToyCVpeZMQxTUWCSILgxIL_ye3I9uMRloJX71ban6bBc-CurNNnNyaerhOvQcDx7ut57Gm5XSpJ2865j7q5Zcsyw-fIqasZ5foCVEQXSJQW5Nz6Wcy2hdRX3weOq1tkUSTIQao77rzjok_NtRriRWdnEUXZGCaWOgIY8axM3DCZGDbQLeh4Jonp1n0xpe2YeNq-lru1w=w1920-h937',
    });

    await this.mailService.registrationCheckEmail(text, html);
  }

  @Get('register/send-confirm-email')
  public async sendConfirmEmail(@Res() res, @Param() email) {
    const user = await prisma.box_users.findFirst({
      where: { email, confirmed: false },
    });

    if (!user) {
      res.sendStatus(400);
      return;
    }

    const confirmationCodeModel = await ConfirmationCode.createOrSelectCode(
      user.user_id,
      'create_user',
    );

    await this.sendRegisterConfirmEmail(email, confirmationCodeModel.code);

    res.sendStatus(200);
  }

  @Get('register/confirm-email')
  public async registerConfirm(@Res() res, @Query() query: ConfirmEmailDto) {
    const { code, email } = query;
    let user = await prisma.box_users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      res.json({
        errors: {
          email: 'Пользователь с таким email не найден',
        },
      });

      return;
    }

    //user already has confirmed
    if (user.confirmed === true) {
      res.json({
        errors: {
          email: 'Пользователь с таким email уже зарегистрирован',
        },
      });

      return;
    }

    const checkResult = await ConfirmationCode.checkCode(
      user.user_id,
      'create_user',
      code,
    );

    if (!checkResult) {
      res.json({
        errors: {
          code: 'Неверный код',
        },
      });

      return;
    }

    await prisma.box_users.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        confirmed: true,
      },
    });

    user = await prisma.box_users.findFirst({
      where: {
        email,
      },
    });

    delete user.password;

    const token = jwt.sign(
      {
        user: {
          user_id: user.user_id,
        },
      },
      process.env.SESSION_AUTHORISATION_SECRET,
    );
    const stock = await getUserStock(user.user_id);

    res.cookie('auth', token);
    res.json({ user, stock });
  }
}

export default UserController;
