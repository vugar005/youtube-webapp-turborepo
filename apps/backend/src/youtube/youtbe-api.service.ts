import { Injectable } from '@nestjs/common';
import * as yt from 'youtube-search-without-api-key';

@Injectable()
export class YoutubeApiService {
  public async searchVideoResults(query: string): Promise<any> {
    const results = await yt.search(query);
    return results;
  }
}
