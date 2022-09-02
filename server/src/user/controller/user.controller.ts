import { Controller, Post, Get, Res, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordService } from '@src/user/service/password.service';
import { MailService } from '@src/app/services/mail.service';
import { HashService } from '@src/user/service/hash.sevice';
import ConfirmEmail from '@src/app/services/templates/ConfirmEmail';
import getBaseUrl from '@src/utils/baseUrl';
import getEmail from '@src/utils/getEmail';

const prisma = new PrismaClient();
const { check, validationResult } = require('express-validator/check');

@Controller('api/user')
export class UserController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
    private readonly hashService: HashService,
  ) {}

  @Post('register')
  //registration by login/password
  public async register(@Res() res, @Req() req) {
    const { email, name, password } = req.body;
    const hashed = await this.passwordService.encryptPassword(password);

    const user = await prisma.box_users.create({
      data: {
        name,
        email,
        password: hashed,
        confirmed: false,
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

  private confirmEmailSalt = 'confirm-email-salt';

  private userConfirmGetHash(key): string {
    const salt = this.confirmEmailSalt;
    return this.hashService.hash(salt + key);
  }

  private async sendRegisterConfirmEmail(userId) {
    //send new account confirmation email
    const hash = this.userConfirmGetHash(userId);
    const baseUrl = getBaseUrl();
    const path = 'registration/confirm';
    //id to get user and hash for security
    const params = '?hash=' + hash + '&id=' + userId;
    const link = baseUrl + '/' + path + params;
    const text = 'Для завершения регистрации перейдите по ссылке: ' + link;
    const html = ConfirmEmail({
      supportEmail: getEmail('admin'),
      confirmationLink: link,
      logoUrl:
        'https://lh3.googleusercontent.com/fife/AAbDypCq56D06yVaxTL4AHn--F1yDJtWkz6tbX5xFR5VrZeaqZMdf163aK6n3y7LgGxkzSe1zfmJNYzekcOo5pT9xy6eQbmVawWgESKcBsjejvkctvKYPfUWJ3pFUjoP-fAdc8Tcl8fe8mEMyZEt6JvwAF-UJRtaXk_iPnUUnmZEQELsmiJeM-j7XXKMvvWpTzMdtOPYC4awqyV0p92Ur-iwbBL1dxatFXisBIMJzMW8ImvTDUBdQv5K_Ud6ka8H-Bf_Vk4TYAuzpAjhiRUqd9svLGwBKN5INdQTO37nIQjjrQENG8BOjSd4-L0ZyqJZMa_5WW_2ZmF5ySEAf5Xgajks9yaL0qqz15R2Tl3xnIb3hJUA2g-gTQJPKxClsr9DZOR8ormvVvKobbzatevh0jqiucfTi2zLjn2NziZNp9C0W7rcIXb4UrXrtfTP3Hyhyl1C--PT4oA7XCg8_LBDVbRuk-MY6aLYimsM8bNx0nVBT-R7Iq-RLmlO-DVvImW7AnZawUFJWX4OFi7fZ3da4e256IyJxTcMAn1ehLQhgPGsVeWXHwU8ezkSA2YjuLojiOnB4fX1TmRk1bgmPgy7rVrsLlM29hvYlTbt-lwIZHcs4mzK0fGRfisQj3yBgh0cu0yz-cXpayLM2Rx-jnHPqSWhNZW3UghAYxOaqTz9OivjxEnM0Dz0l32GxLG9hxFRStRCiknerLrYTaKifTUSYyiQ8ncAOMEbPM6HD7EQ9TQ4fITuaczbFACNqaAtt0BykDUZXfwGKC8Nb4EtqQQ6AFdsMN9s_bbyoPa1qf7BBb5-5frFJkbl4N8ESPROP86H_qov-twn3Nnd-dQv7v_z-sMD9smES6WFzfSwmCHxGod-XQnV38IMAltjSFavQYYfIRXYvwVr_g16DKdz15DTUrVx5IKtR2Fk1imXZbW0Ik4NW2qj4LkujzEFNDBxfvDu8ai3Eiv_CzGzduP907ibThZdlSrPuGAPLQAW6gM2QrZ5KclAgImGbghwX8aV1ewj80muwKkQdnhodHLw_oBUjWDqQgoQsyxeuzeXR9_zWxMuoeeToer6267I6gToyCVpeZMQxTUWCSILgxIL_ye3I9uMRloJX71ban6bBc-CurNNnNyaerhOvQcDx7ut57Gm5XSpJ2865j7q5Zcsyw-fIqasZ5foCVEQXSJQW5Nz6Wcy2hdRX3weOq1tkUSTIQao77rzjok_NtRriRWdnEUXZGCaWOgIY8axM3DCZGDbQLeh4Jonp1n0xpe2YeNq-lru1w=w1920-h937',
    });

    await this.mailService.registrationCheckEmail(text, html);
  }

  @Get('send-confirm-email')
  public async sendConfirmEmail(@Res() res, @Req() req) {
    await this.sendRegisterConfirmEmail(req.query.userId);

    res.sendStatus(200);
  }

  @Get('register-confirm')
  public async registerConfirm(@Res() res, @Req() req) {
    const { hash } = req.query;
    const userId = parseInt(req.query.userId);
    const user = await prisma.box_users.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    //user already has confirmed
    if (user.confirmed === true) {
      res.sendStatus(400);
      return;
    }

    //check hash
    if (this.userConfirmGetHash(userId) !== hash) {
      res.sendStatus(401);
      return;
    }

    await prisma.box_users.update({
      where: {
        user_id: userId,
      },
      data: {
        confirmed: true,
      },
    });

    res.sendStatus(200);
  }
}

export default UserController;
