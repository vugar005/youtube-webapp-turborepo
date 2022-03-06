import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeApiModule } from './youtube/youtube-api.module';

@Module({
  imports: [YoutubeApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
