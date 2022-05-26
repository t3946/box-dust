import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';

const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

@Controller('api/box')
export class BoxController {
  constructor(private readonly appService: AppService) {}

  @Get('/:box_id')
  async getBox(@Res() res, @Param() params) {
    const box = await prisma.box_boxes.findUnique({
      where: {
        box_id: parseInt(params.box_id),
      },
      include: {
        items: {
          include: {
            image: true,
          },
        },
      },
    });

    res.json({ box });
  }
}

export default BoxController;
