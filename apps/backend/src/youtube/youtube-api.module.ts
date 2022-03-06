import { Module } from '@nestjs/common';
import { YoutubeApiService } from './youtbe-api.service';
import { YoutubeController } from './youtube.controller';
@Module({
  imports: [],
  providers: [YoutubeApiService],
  controllers: [YoutubeController],
})
export class YoutubeApiModule {}
