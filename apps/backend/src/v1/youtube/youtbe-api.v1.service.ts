import { Injectable } from '@nestjs/common';
import { IYoutubeSearchItem, IYoutubeSearchResult, IYoutubeSearchSnippet } from '@youtube/common-ui';
import { from, map, Observable } from 'rxjs';
import * as yt from 'youtube-search-without-api-key';

@Injectable()
export class YoutubeApiServiceV1 {
  public searchList(query: string): Observable<IYoutubeSearchResult> {
    return from(yt.search(query)).pipe(map((res) => this.mapToYoutubeSearchResult(res)));
  }

  private mapToYoutubeSearchResult(results): IYoutubeSearchResult {
    return {
      kind: null,
      etag: null,
      nextPageToken: null,
      regionCode: null,
      pageInfo: null,
      items: this.mapToYoutubeSearchItem(results),
    };
  }

  private mapToYoutubeSearchItem(results): IYoutubeSearchItem[] {
    return results?.map((result) => {
      return {
        kind: null,
        etag: null,
        id: {
          videoId: result?.id?.videoId,
        },
        snippet: this.mapToYoutubeSearchSnippet(result),
      };
    });
  }

  private mapToYoutubeSearchSnippet(result): IYoutubeSearchSnippet {
    const snippet = result?.snippet;
    return {
      publishedAt: snippet?.publishedAt,
      channelId: null,
      title: result?.title,
      description: result?.description,
      thumbnails: {
        default: snippet?.thumbnails?.default,
        medium: snippet?.thumbnails?.medium,
        high: snippet?.thumbnails?.high,
      },
      channelTitle: null,
      liveBroadcastContent: null,
      publishTime: null,
    };
  }
}
