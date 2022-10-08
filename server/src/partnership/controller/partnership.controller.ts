import { Controller, Get, Res, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('api/partnership')
export class PartnershipController {
  //user require new partner status
  @Get('upgrade')
  public async upgrade(@Res() res, @Req() req) {
    const currentStatus = await prisma.box_partnerships.findUnique({
      where: {
        partnership_id: req.user.partnership_id,
      },
    });

    // реферал не просто тот кто зарегался, он также должен и бабла залить,
    // это самое главное(здесь появляется слово "активный")
    const referrals = await prisma.box_users.findMany({
      where: { refer: req.user.user_id },
    });
    //todo: рассчёт индекса для рефералов
    // const index = ;
    let nextStatus;

    switch (currentStatus.slug) {
      case 'basic_partner_1':
        nextStatus = await prisma.box_partnerships.findUnique({
          where: {
            slug: 'basic_partner_2',
          },
        });

        if (referrals.length < 3) {
          res.json({ error: { message: 'Недостаточно активных рефералов' } });
          return;
        }

        await prisma.box_users.update({
          where: { user_id: req.user.user_id },
          data: { partnership_id: nextStatus.partnership_id },
        });

        res.json({ newStatus: nextStatus });
        return;

      case 'basic_partner_2':
        nextStatus = await prisma.box_partnerships.findUnique({
          where: {
            slug: 'basic_partner_3',
          },
        });

        if (referrals.length < 5) {
          res.json({ error: { message: 'Недостаточно активных рефералов' } });
          return;
        }

        await prisma.box_users.update({
          where: { user_id: req.user.user_id },
          data: { partnership_id: nextStatus.partnership_id },
        });

        res.json({ newStatus: nextStatus });
        return;

      case 'basic_partner_3':
        nextStatus = await prisma.box_partnerships.findUnique({
          where: {
            slug: 'basic_partner_4',
          },
        });

        if (referrals.length < 10) {
          res.json({ error: { message: 'Недостаточно активных рефералов' } });
          return;
        }

        await prisma.box_users.update({
          where: { user_id: req.user.user_id },
          data: { partnership_id: nextStatus.partnership_id },
        });

        res.json({ newStatus: nextStatus });
        return;
    }

    res.json({ currentStatus });
  }

  @Get('get')
  public async get(@Res() res) {
    const partnerships = await prisma.box_partnerships.findMany({
      where: {
        is_public: true,
      },
    });
    res.json({partnerships});
  }
}

export default PartnershipController;
