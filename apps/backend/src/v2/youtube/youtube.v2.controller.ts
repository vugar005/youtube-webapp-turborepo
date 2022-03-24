import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeApiServiceV2 } from './youtbe-api.v2.service';
import { IYoutubeSearchResult } from '@youtube/common-ui';
import { firstValueFrom } from 'rxjs';
@Controller({
  path: 'youtube',
  version: '2',
})
export class YoutubeControllerV2 {
  constructor(private readonly youtubeApiService: YoutubeApiServiceV2) {}

  @Get('searchVideo')
  async searchVideos(@Query() query): Promise<IYoutubeSearchResult> {
    const { q } = query;
    const results = await firstValueFrom(this.youtubeApiService.searchVideoResults(q.trim()));
    return results;
  }
}
