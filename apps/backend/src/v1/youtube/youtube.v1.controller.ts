import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeApiServiceV1 } from './youtbe-api.v1.service';
import { IYoutubeSearchResult } from '@youtube/common-ui';
import { firstValueFrom } from 'rxjs';
@Controller({
  path: 'youtube',
  version: '1',
})
export class YoutubeControllerV1 {
  constructor(private readonly youtubeApiService: YoutubeApiServiceV1) {}

  @Get('searchVideo')
  async searchVideos(@Query() query): Promise<IYoutubeSearchResult> {
    const { q } = query;
    const results = await firstValueFrom(this.youtubeApiService.searchVideoResults(q.trim()));
    return results;
  }
}
