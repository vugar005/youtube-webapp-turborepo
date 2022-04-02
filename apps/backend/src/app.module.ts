import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeApiModuleV1 } from './v1/youtube/youtube-api.v1.module';
import { YoutubeApiModuleV2 } from './v2/youtube/youtube-api.v2.module';

@Module({
  imports: [YoutubeApiModuleV1, YoutubeApiModuleV2],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
