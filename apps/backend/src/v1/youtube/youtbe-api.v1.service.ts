import { Injectable } from '@nestjs/common';
import {
  IYoutubeContentDetails,
  IYoutubeSearchItem,
  IYoutubeSearchResult,
  IYoutubeSearchSnippet,
  IYoutubeStatistics,
  IYoutubeVideoItem,
  IYoutubeVideoResult,
  IYoutubeVideoSnippet,
} from '@youtube/common-ui';
import { catchError, forkJoin, from, map, Observable, of } from 'rxjs';
import * as yt from 'youtube-search-without-api-key';

@Injectable()
export class YoutubeApiServiceV1 {
  public searchList(query: string): Observable<IYoutubeSearchResult> {
    return from(yt.search(query)).pipe(map((res) => this.mapToYoutubeSearchResult(res)));
  }

  public videolist(id: string): Observable<IYoutubeVideoResult[]> {
    if (!id) {
      return of([]);
    }
    const transformedId = id.split(',');
    const requests: Observable<IYoutubeVideoResult>[] = transformedId.map((query) => this.getVideoListRequest(query));
    return forkJoin(requests).pipe(map((result: IYoutubeVideoResult[]) => result.filter(Boolean)));
  }

  private getVideoListRequest(id: string): Observable<IYoutubeVideoResult> {
    return from(yt.search(id)).pipe(
      catchError(() => of(null)),
      map((res) => this.mapToYoutubeVideoResult(res))
    );
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

  private mapToYoutubeVideoResult(result): IYoutubeVideoResult {
    return {
      kind: null,
      etag: null,
      pageInfo: {
        totalResults: 1,
        resultsPerPage: 1,
      },
      items: this.mapToYoutubeVideoItem(result),
    };
  }

  private mapToYoutubeVideoItem(results): IYoutubeVideoItem[] {
    return results.map((result) => {
      return {
        kind: null,
        etag: null,
        id: result?.id?.videoId,
        snippet: this.mapToYoutubeVideoSnippet(result),
        contentDetails: this.mapToYoutubeVideoContent(result),
        statistics: this.mapToYoutubeVideoStatistics(result),
      };
    });
  }

  private mapToYoutubeVideoSnippet(result): IYoutubeVideoSnippet {
    return {
      publishedAt: result?.snippet?.publishedAt,
      channelId: null,
      title: result?.title,
      description: result?.description,
      thumbnails: {
        default: result?.snippet?.thumbnails?.default,
        medium: result?.snippet?.thumbnails?.high,
        high: result?.snippet?.thumbnails?.high,
        standard: result?.snippet?.thumbnails?.high,
        maxres: result?.snippet?.thumbnails?.high,
      },
      channelTitle: null,
      tags: null,
      categoryId: null,
      liveBroadcastContent: null,
      localized: null,
    };
  }

  private mapToYoutubeVideoContent(result): IYoutubeContentDetails {
    return {
      duration: result?.snippet?.duration,
      dimension: null,
      definition: null,
      caption: null,
      licensedContent: null,
      contentRating: null,
      projection: null,
    };
  }

  private mapToYoutubeVideoStatistics(result): IYoutubeStatistics {
    return {
      viewCount: +result?.snippet?.views,
      likeCount: null,
      favoriteCount: null,
      commentCount: null,
    };
  }
}
