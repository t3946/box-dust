import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PartnershipService {
  public async getAllPublic(): Promise<Record<any, any>> {
    const partnerships = await prisma.box_partnerships.findMany({
      where: {
        is_public: true,
      },
    });

    return { partnerships };
  }
}
