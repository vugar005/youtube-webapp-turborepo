import { Module } from '@nestjs/common';
import { YoutubeApiServiceV2 } from './youtbe-api.v2.service';
import { YoutubeControllerV2 } from './youtube.v2.controller';
@Module({
  imports: [],
  providers: [YoutubeApiServiceV2],
  controllers: [YoutubeControllerV2],
})
export class YoutubeApiModuleV2 {}
