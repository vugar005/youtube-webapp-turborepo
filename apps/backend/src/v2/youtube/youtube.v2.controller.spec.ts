import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeControllerV2 } from './youtube.v2.controller';

describe('YoutubeControllerV2', () => {
  let controller: YoutubeControllerV2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeControllerV2],
    }).compile();

    controller = module.get<YoutubeControllerV2>(YoutubeControllerV2);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
