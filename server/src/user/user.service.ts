import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt = require('bcrypt');
import CreateUserDto from '@src/user/dto/create-user.dto';
import ResponseUserDto from '@src/user/dto/response-user.dto';
import UpdateUserDto from '@src/user/dto/update-user.dto';
import { ConfirmationCode } from '@src/utils/ConfirmationCode';
import { StockService } from '@src/stock/stock.service';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(private readonly stockService: StockService) {}

  private async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    let hashed;

    password += process.env.PASSWORD_SALT;

    await bcrypt.genSalt(saltRounds).then(async function (salt) {
      await bcrypt.hash(password, salt).then((hash) => {
        hashed = hash;
      });
    });

    return hashed;
  }

  public async getUserById(user_id: number): Promise<Record<any, any>> {
    return await prisma.box_users.findUnique({
      where: { user_id },
    });
  }

  public async getResponseUser(user_id: number): Promise<ResponseUserDto> {
    const user = await this.getUserById(user_id);

    delete user.password;

    return user;
  }

  public async create(createUserDto: CreateUserDto): Promise<Record<any, any>> {
    const { email, password, name } = createUserDto;

    //check email unique
    let user = await prisma.box_users.findFirst({
      where: { email },
    });

    if (user) {
      if (user.confirmed) {
        throw {
          error: { email: 'Пользователь с таким email уже зарегистрирован' },
        };
      } else {
        await prisma.box_users.delete({
          where: { email },
        });
      }
    }

    const passwordHashed = await this.encryptPassword(password);

    await prisma.box_users.create({
      data: {
        name,
        email,
        password: passwordHashed,
        confirmed: false,
      },
    });

    user = await prisma.box_users.findFirst({
      where: { email },
    });

    return await this.getResponseUser(user.user_id);
  }

  public async update(
    updateUserDto: UpdateUserDto,
    user_id: number,
  ): Promise<Record<any, any>> {
    let updateFields = { ...updateUserDto };

    //check new email for unique
    if (updateFields.email) {
      const user = await prisma.box_users.findFirst({
        where: {
          email: updateFields.email,
        },
      });

      if (user) {
        throw {
          error: { email: 'Пользователь с таким email уже зарегистрирован' },
        };
      }
    }

    if (updateFields.password) {
      updateFields = {
        ...updateFields,
        password: await this.encryptPassword(updateFields.password),
      };
    }

    await prisma.box_users.update({
      where: {
        user_id,
      },

      data: updateFields,
    });

    return await this.getResponseUser(user_id);
  }

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    password += process.env.PASSWORD_SALT;

    let isPasswordMatch = false;

    await bcrypt
      .compare(password, hash)
      .then((result) => (isPasswordMatch = result));

    return isPasswordMatch;
  }

  public async getConfirmEmailCode(email: string): Promise<string> {
    const user = await prisma.box_users.findFirst({
      where: { email },
    });

    if (!user) {
      throw {
        error: { email: 'Пользователь с таким email не найден' },
      };
    } else if (user.confirmed) {
      throw {
        error: { email: 'User already confirmed' },
      };
    }

    const { code } = await ConfirmationCode.createOrSelectCode(
      user.user_id,
      'create_user',
    );

    return code;
  }

  public async confirmUser(
    email: string,
    code: string,
  ): Promise<Record<any, any>> {
    const user = await prisma.box_users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw {
        error: { email: 'Пользователь с таким email не найден' },
      };
    } else if (user.confirmed === true) {
      throw {
        error: { email: 'Пользователь с таким email уже зарегистрирован' },
      };
    }

    const { error: checkCodeError } = await ConfirmationCode.checkCode(
      user.user_id,
      'create_user',
      code,
    );

    if (checkCodeError) {
      throw {
        errors: { code: checkCodeError },
      };
    }

    await this.update({ confirmed: true }, user.user_id);

    return await this.getResponseUser(user.user_id);
  }

  public async play(
    user_id: number,
    box_id: number,
  ): Promise<Record<any, any>> {
    const box = await prisma.box_boxes.findUnique({
      where: { box_id },
    });

    // check on user can play this box

    if (!box) {
      throw {
        error: { box_id: 'box not found' },
      };
    } else if (!box.is_active) {
      throw {
        error: { box_id: "Box is not active. You can't play this box." },
      };
    }

    const user = await this.getUserById(user_id);

    if (user.balance < box.price) {
      throw {
        error: { box_id: 'not enough money' },
      };
    }

    // get random cheap prize

    const rarity = await prisma.box_rare_statuses.findFirst({
      where: {
        slug: 'frequently',
      },
    });

    const cheapBoxItems = await prisma.box_items.findMany({
      where: {
        box_id,
        rare_status_id: rarity.rare_status_id,
      },
    });

    const prize =
      cheapBoxItems[
        Math.floor(Math.random() * cheapBoxItems.length) % cheapBoxItems.length
      ];

    // update user balance and stock

    await this.update({ balance: user.balance - box.price }, user.user_id);

    await this.stockService.addItem(user_id, prize.item_id, 1);

    return prize;
  }

  public async updatePartnership(
    user_id: number,
    partnerShipSlug: string,
  ): Promise<void> {
    const user = await this.getUserById(user_id);

    if (!user.confirmed) {
      throw { error: 'user not confirmed' };
    }

    const { partnership_id } = await prisma.box_partnerships.findFirst({
      where: {
        slug: partnerShipSlug,
      },
    });

    const currentStatus = await prisma.box_partnerships.findUnique({
      where: {
        partnership_id,
      },
    });

    const referrals = await prisma.box_users.findMany({
      where: { refer: user_id },
    });

    switch (partnerShipSlug) {
      case 'basic_partner_1':
        if (currentStatus) {
          throw { error: "you can't get this status" };
        }
        break;

      case 'basic_partner_2':
        if (currentStatus.slug !== 'basic_partner_1') {
          throw { error: "you can't get this status" };
        }

        if (referrals.length < 3) {
          throw { error: 'Недостаточно активных рефералов' };
        }

        break;

      case 'basic_partner_3':
        if (currentStatus.slug !== 'basic_partner_2') {
          throw { error: "you can't get this status" };
        }

        if (referrals.length < 5) {
          throw { error: 'Недостаточно активных рефералов' };
        }

        break;

      case 'basic_partner_4':
        if (currentStatus.slug !== 'basic_partner_3') {
          throw { error: "you can't get this status" };
        }

        if (referrals.length < 10) {
          throw { error: 'Недостаточно активных рефералов' };
        }

        break;

      default:
        throw { error: "you can't get this status" };
    }

    await this.update({ partnership_id }, user_id);
  }
}
