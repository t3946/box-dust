import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PartnershipService } from '@src/partnership/partnership.service';

@Controller('api/partnership')
export class PartnershipController {
  constructor(private readonly partnershipService: PartnershipService) {}

  @Get('get-all')
  @HttpCode(HttpStatus.OK)
  public async getAll(): Promise<Record<any, any>> {
    const { partnerships } = await this.partnershipService.getAllPublic();

    return { partnerships };
  }
}

export default PartnershipController;
