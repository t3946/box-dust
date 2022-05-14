import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';

const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-catalog')
  async getCatalog(@Res() res) {
    const catalog = await prisma.box_categories.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        boxes: true,
      },
    });

    res.json({ catalog });
  }
}
