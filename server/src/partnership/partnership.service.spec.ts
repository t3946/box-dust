import { Test, TestingModule } from '@nestjs/testing';
import { PartnershipService } from './partnership.service';

describe('PartnershipService', () => {
  let service: PartnershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnershipService],
    }).compile();

    service = module.get<PartnershipService>(PartnershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
