import { Injectable } from '@nestjs/common';
import bcrypt = require('bcrypt');

@Injectable()
export class CryptService {
  public async checkEquality(string: string, hash: string): Promise<boolean> {
    string += process.env.PASSWORD_SALT;

    let isMatch = false;

    await bcrypt.compare(string, hash).then((result) => (isMatch = result));

    return isMatch;
  }

  public async encrypt(string: string): Promise<string> {
    const saltRounds = 10;
    let hashed;

    await bcrypt.genSalt(saltRounds).then(async function (salt) {
      await bcrypt.hash(string, salt).then((hash) => {
        hashed = hash;
      });
    });

    return hashed;
  }
}
