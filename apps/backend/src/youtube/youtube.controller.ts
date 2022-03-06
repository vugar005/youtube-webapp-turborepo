import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeApiService } from './youtbe-api.service';
import { IYoutubeSearchResult } from '@youtube/common-ui';
@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeApiService: YoutubeApiService) {}

  @Get('searchVideo')
  async searchVideos(@Query() query): Promise<IYoutubeSearchResult> {
    const { q } = query;
    const results = await this.youtubeApiService.searchVideoResults(q.trim());
    return results;
  }
}
