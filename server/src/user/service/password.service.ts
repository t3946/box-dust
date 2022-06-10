import { Injectable } from '@nestjs/common';
import config from '@src/user/config';

const bcrypt = require('bcrypt');

@Injectable()
export class PasswordService {
  public async encryptPassword(password) {
    const saltRounds = 10;
    let hashed;

    password += config.passwordSalt;

    await bcrypt.genSalt(saltRounds).then(async function (salt) {
      await bcrypt.hash(password, salt).then((hash) => {
        hashed = hash;
      });
    });
    return hashed;
  }

  public async comparePassword(password, hash): Promise<boolean> {
    password += config.passwordSalt;

    let isPasswordMatch = false;

    await bcrypt
      .compare(password, hash)
      .then((result) => (isPasswordMatch = result));

    return isPasswordMatch;
  }
}
