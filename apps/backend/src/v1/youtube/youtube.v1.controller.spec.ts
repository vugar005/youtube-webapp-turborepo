import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeControllerV1 } from './youtube.v1.controller';

describe('YoutubeControllerV1', () => {
  let controller: YoutubeControllerV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeControllerV1],
    }).compile();

    controller = module.get<YoutubeControllerV1>(YoutubeControllerV1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
