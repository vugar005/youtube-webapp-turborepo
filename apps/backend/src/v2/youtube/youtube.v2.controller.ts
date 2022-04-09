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

  @Get('searchlist')
  async searchList(@Query() query): Promise<IYoutubeSearchResult> {
    const { q } = query;
    return firstValueFrom(this.youtubeApiService.searchList(q.trim()));
  }

  @Get('videolist')
  async videoList(@Query() query): Promise<IYoutubeVideoResult[]> {
    if (!query) {
      return null;
    }
    const { id } = query;
    return firstValueFrom(this.youtubeApiService.videoList(id));
  }
}
