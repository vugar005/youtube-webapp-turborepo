import { Module } from '@nestjs/common';
import { YoutubeApiServiceV1 } from './youtbe-api.v1.service';
import { YoutubeControllerV1 } from './youtube.v1.controller';
@Module({
  imports: [],
  providers: [YoutubeApiServiceV1],
  controllers: [YoutubeControllerV1],
})
export class YoutubeApiModuleV1 {}
