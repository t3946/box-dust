import { Injectable } from '@nestjs/common';
// import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async registrationCheckEmail(text, html = null) {
    const nodemailer = require('nodemailer');
    console.log('registrationCheckEmail');

    const smtpCredentials = {
      user: 'account@boxdust.ru',
      pass: 'Account1',
    };

    const configOptions = {
      host: 'smtp.beget.com',
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpCredentials.user, // generated ethereal user
        pass: smtpCredentials.pass, // generated ethereal password
      },
    };

    const transporter = nodemailer.createTransport(configOptions);

    const info = await transporter.sendMail({
      from: '"Box Dust Team" <account@boxdust.ru>', // sender address
      to: 'svialence@yandex.ru', // list of receivers separated by comma
      subject: 'Регистрация boxdust.ru', // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return 'Hello World!';
  }
}
