import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from '@src/app/services/app.service';

const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

@Controller('api/box')
export class BoxController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/:box_id')
  async getBox(@Res() res, @Param() params) {
    const box: any = await prisma.boxes.findUnique({
      where: {
        id: parseInt(params.box_id),
      },
      include: {
        case_items: {
          include: {
            cs_items: true,
          },
        },
      },
    });

    res.json({ box });
  }
}

export default BoxController;
