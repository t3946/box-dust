import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from '@src/app/services/app.service';

const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

@Controller('api/category')
export class CategoryController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getCatalog(@Res() res) {
    const catalog = await prisma.box_categories.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        boxes: {
          where: {
            is_active: true,
          },
          include: {
            box_designs: true,
            box_items: {
              include: {
                cs_items: true,
              }
            },
          },
        },
      },
    });

    res.json({ catalog });
  }
}

export default CategoryController;
