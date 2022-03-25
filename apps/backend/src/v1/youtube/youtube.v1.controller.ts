import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeApiServiceV1 } from './youtbe-api.v1.service';
import { IYoutubeSearchResult, IYoutubeVideoResult } from '@youtube/common-ui';
import { firstValueFrom } from 'rxjs';
@Controller({
  path: 'youtube',
  version: '1',
})
export class YoutubeControllerV1 {
  constructor(private readonly youtubeApiService: YoutubeApiServiceV1) {}

  @Get('searchList')
  async searchList(@Query() query): Promise<IYoutubeSearchResult> {
    const { q } = query;
    const results = await firstValueFrom(this.youtubeApiService.searchList(q.trim()));
    return results;
  }

  @Get('videolist')
  async videolist(@Query() query): Promise<IYoutubeVideoResult> {
    const { q } = query;
    const results = await firstValueFrom(this.youtubeApiService.videolist(q.trim()));
    return results;
  }
}
