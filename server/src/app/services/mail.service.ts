import { Injectable } from '@nestjs/common';
import ConfirmEmail from '@templates/email/ConfirmEmail';
import getEmail from '@src/utils/getEmail';
import nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  private static async sendMail(to, text, html = null): Promise<void> {
    const configOptions = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASS, // generated ethereal password
      },
    };

    const transporter: Record<any, any> =
      nodemailer.createTransport(configOptions);

    await transporter.sendMail({
      from: '"Box Dust Team" <account@boxdust.ru>',
      to,
      subject: 'Регистрация boxdust.ru',
      text,
      html,
    });
  }

  public async sendRegisterConfirm(email: string, code: string): Promise<void> {
    const text = 'Код подтверждения регистрации: ' + code;
    const html = ConfirmEmail({
      supportEmail: getEmail('admin'),
      confirmationCode: code,
      logoUrl:
        'https://lh3.googleusercontent.com/fife/AAbDypCq56D06yVaxTL4AHn--F1yDJtWkz6tbX5xFR5VrZeaqZMdf163aK6n3y7LgGxkzSe1zfmJNYzekcOo5pT9xy6eQbmVawWgESKcBsjejvkctvKYPfUWJ3pFUjoP-fAdc8Tcl8fe8mEMyZEt6JvwAF-UJRtaXk_iPnUUnmZEQELsmiJeM-j7XXKMvvWpTzMdtOPYC4awqyV0p92Ur-iwbBL1dxatFXisBIMJzMW8ImvTDUBdQv5K_Ud6ka8H-Bf_Vk4TYAuzpAjhiRUqd9svLGwBKN5INdQTO37nIQjjrQENG8BOjSd4-L0ZyqJZMa_5WW_2ZmF5ySEAf5Xgajks9yaL0qqz15R2Tl3xnIb3hJUA2g-gTQJPKxClsr9DZOR8ormvVvKobbzatevh0jqiucfTi2zLjn2NziZNp9C0W7rcIXb4UrXrtfTP3Hyhyl1C--PT4oA7XCg8_LBDVbRuk-MY6aLYimsM8bNx0nVBT-R7Iq-RLmlO-DVvImW7AnZawUFJWX4OFi7fZ3da4e256IyJxTcMAn1ehLQhgPGsVeWXHwU8ezkSA2YjuLojiOnB4fX1TmRk1bgmPgy7rVrsLlM29hvYlTbt-lwIZHcs4mzK0fGRfisQj3yBgh0cu0yz-cXpayLM2Rx-jnHPqSWhNZW3UghAYxOaqTz9OivjxEnM0Dz0l32GxLG9hxFRStRCiknerLrYTaKifTUSYyiQ8ncAOMEbPM6HD7EQ9TQ4fITuaczbFACNqaAtt0BykDUZXfwGKC8Nb4EtqQQ6AFdsMN9s_bbyoPa1qf7BBb5-5frFJkbl4N8ESPROP86H_qov-twn3Nnd-dQv7v_z-sMD9smES6WFzfSwmCHxGod-XQnV38IMAltjSFavQYYfIRXYvwVr_g16DKdz15DTUrVx5IKtR2Fk1imXZbW0Ik4NW2qj4LkujzEFNDBxfvDu8ai3Eiv_CzGzduP907ibThZdlSrPuGAPLQAW6gM2QrZ5KclAgImGbghwX8aV1ewj80muwKkQdnhodHLw_oBUjWDqQgoQsyxeuzeXR9_zWxMuoeeToer6267I6gToyCVpeZMQxTUWCSILgxIL_ye3I9uMRloJX71ban6bBc-CurNNnNyaerhOvQcDx7ut57Gm5XSpJ2865j7q5Zcsyw-fIqasZ5foCVEQXSJQW5Nz6Wcy2hdRX3weOq1tkUSTIQao77rzjok_NtRriRWdnEUXZGCaWOgIY8axM3DCZGDbQLeh4Jonp1n0xpe2YeNq-lru1w=w1920-h937',
    });

    await MailService.sendMail(email, text, html);
  }
}
