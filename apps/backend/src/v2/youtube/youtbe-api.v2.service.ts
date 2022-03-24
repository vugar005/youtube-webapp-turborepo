import { Injectable } from '@nestjs/common';
import { IYoutubeSearchItem, IYoutubeSearchResult, IYoutubeSearchSnippet } from '@youtube/common-ui';
import { from, map, Observable } from 'rxjs';
import * as yt from 'youtube-search-api';

@Injectable()
export class YoutubeApiServiceV2 {
  public searchVideoResults(query: string): Observable<IYoutubeSearchResult> {
    return from(yt.GetListByKeyword(query)).pipe(map((res) => this.mapToYoutubeSearchResult(res)));
  }

  private mapToYoutubeSearchResult(result): IYoutubeSearchResult {
    return {
      kind: null,
      etag: null,
      nextPageToken: result.nextPageToken,
      regionCode: null,
      pageInfo: null,
      items: this.mapToYoutubeSearchItem(result.items),
    };
  }

  private mapToYoutubeSearchItem(results): IYoutubeSearchItem[] {
    return results?.map((result) => {
      return {
        kind: null,
        etag: null,
        id: {
          videoId: result?.id,
        },
        snippet: this.mapToYoutubeSearchSnippet(result),
      };
    });
  }

  private mapToYoutubeSearchSnippet(result): IYoutubeSearchSnippet {
    const hightThumbnail = result?.thumbnail?.thumbnails?.find((item) => item?.width === 720);
    const defaultThumbnail = result?.thumbnail?.thumbnails?.[0];

    return {
      publishedAt: result?.publishedAt,
      channelId: null,
      title: result?.title,
      description: result?.title,
      thumbnails: {
        default: hightThumbnail || defaultThumbnail,
        medium: defaultThumbnail,
        high: hightThumbnail || defaultThumbnail,
      },
      channelTitle: result?.channelTitle,
      liveBroadcastContent: null,
      publishTime: null,
    };
  }
}
