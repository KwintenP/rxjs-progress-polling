import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './progress.controller';

describe('Progress Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ProgressController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ProgressController = module.get<ProgressController>(ProgressController);
    expect(controller).toBeDefined();
  });
});
