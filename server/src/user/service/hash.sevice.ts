import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  private readonly salt = 'salt';

  hash(key) {
    const crypto = require("crypto");
    return crypto
      .createHash('md5')
      .update(this.salt + key)
      .digest('hex');
  }
}
