export interface IYoutubeSearchResult {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo?: IYoutubeSearchPageInfo;
  items?: IYoutubeSearchItem[];
}

export interface IYoutubeSearchItem {
  kind?: string;
  etag?: string;
  id: IYoutubeSearchId;
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
  thumbnails: IYoutubeThumbnail;
  channelTitle?: string;
  liveBroadcastContent?: string;
  publishTime?: Date;
}

export interface IYoutubeThumbnail {
  default: IYoutubeThumbnailDetail;
  medium: IYoutubeThumbnailDetail;
  high: IYoutubeThumbnailDetail;
}

interface IYoutubeThumbnailDetail {
  url: string;
  width: number;
  height: number;
}

export interface IYoutubeSearchPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
