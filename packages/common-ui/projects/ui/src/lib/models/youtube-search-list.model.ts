import { IYoutubePageInfo, IYoutubeThumbnailDetail } from './youtube-common.model';

export interface IYoutubeSearchResult {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo?: IYoutubePageInfo;
  items?: IYoutubeSearchItem[];
}

export interface IYoutubeSearchItem {
  kind?: string;
  etag?: string;
  id?: IYoutubeSearchId;
  snippet: IYoutubeSearchSnippet;
}

export interface IYoutubeSearchId {
  kind?: string;
  videoId: string;
}

export interface IYoutubeSearchSnippet {
  publishedAt: Date;
  channelId?: string;
  title: string;
  description: string;
  thumbnails: IYoutubeSearchThumbnail;
  channelTitle?: string;
  liveBroadcastContent?: string;
  publishTime?: Date;
}

export interface IYoutubeSearchThumbnail {
  default: IYoutubeThumbnailDetail;
  medium: IYoutubeThumbnailDetail;
  high: IYoutubeThumbnailDetail;
}
