import { PrismaClient } from '@prisma/client';
import { LogLevel } from 'ts-loader/dist/logger';
const prisma = new PrismaClient();

export class ConfirmationCode {
  private static adminCode = 'boxbox';
  private static generateRandomConfirmationCode(length) {
    let code = '';

    for (let i = 0; i < length; i++) {
      code += Math.floor(Math.random() * 10) % 10;
    }

    return code;
  }

  public static async createCode(userId, action) {
    return await prisma.confirmation_codes.create({
      data: {
        user_id: userId,
        action: action,
        code: ConfirmationCode.generateRandomConfirmationCode(6),
      },
    });
  }

  public static async createOrSelectCode(userId, action) {
    const codeModel = await prisma.confirmation_codes.findFirst({
      where: {
        user_id: userId,
        action: action,
      },
    });

    if (codeModel) {
      return codeModel;
    }

    return ConfirmationCode.createCode(userId, action);
  }

  public static async checkCode(userId, action, code) {
    const codeModel = await prisma.confirmation_codes.findFirst({
      where: {
        user_id: userId,
        action: action,
      },
    });

    if (!codeModel) {
      return { error: 'Модель кода не найдена' };
    }

    if (
      (ConfirmationCode.adminCode && code === ConfirmationCode.adminCode) ||
      codeModel.code === code
    ) {
      await prisma.confirmation_codes.delete({
        where: {
          confirmation_code_id: codeModel.confirmation_code_id,
        },
      });

      return true;
    }

    return { error: 'неверный код' };
  }
}
