import { Controller, Get, Res, Param } from '@nestjs/common';
import { AppService } from '@src/app/services/app.service';

const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly appService: AppService) {}

  @Get('/:page')
  async getHistory(@Res() res, @Param() params) {
    const pageSize = 10;
    const reviews = await prisma.box_reviews.findMany({
      take: pageSize,
      skip: pageSize * (parseInt(params.page) - 1),
      select: {
        text: true,
        user: {
          select: {
            f_user_id: true,
            name: true,
          },
        },
      },
    });

    res.json({ reviews });
  }
}

export default ReviewsController;
