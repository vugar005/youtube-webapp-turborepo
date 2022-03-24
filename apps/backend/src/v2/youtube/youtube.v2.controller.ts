import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeApiServiceV2 } from './youtbe-api.v2.service';
import { IYoutubeSearchResult, IYoutubeVideoResult } from '@youtube/common-ui';
import { firstValueFrom } from 'rxjs';
@Controller({
  path: 'youtube',
  version: '2',
})
export class YoutubeControllerV2 {
  constructor(private readonly youtubeApiService: YoutubeApiServiceV2) {}

  @Get('searchList')
  async searchList(@Query() query): Promise<IYoutubeSearchResult> {
    const { q } = query;
    const results = await firstValueFrom(this.youtubeApiService.searchList(q.trim()));
    return results;
  }

  @Get('videoList')
  async videoList(@Query() query): Promise<IYoutubeVideoResult> {
    const { q } = query;
    const results = await firstValueFrom(this.youtubeApiService.videoList(q.trim()));
    return results;
  }
}
