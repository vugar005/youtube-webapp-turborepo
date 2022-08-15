import { IYoutubePageInfo, IYoutubeThumbnailDetail } from './youtube-common.model';

export interface IYoutubeVideoResult {
  kind: string;
  etag: string;
  items: IYoutubeVideoItem[];
  pageInfo: IYoutubePageInfo;
}

export interface IYoutubeVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet?: IYoutubeVideoSnippet;
  contentDetails: IYoutubeContentDetails;
  statistics?: IYoutubeStatistics;
}

export interface IYoutubeVideoThumbnail {
  default: IYoutubeThumbnailDetail;
  medium: IYoutubeThumbnailDetail;
  high: IYoutubeThumbnailDetail;
  standard: IYoutubeThumbnailDetail;
  maxres: IYoutubeThumbnailDetail;
}

interface Localized {
  title: string;
  description: string;
}

export interface IYoutubeVideoSnippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IYoutubeVideoThumbnail;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
}

export interface IYoutubeContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: any;
  projection: string;
}

export interface IYoutubeStatistics {
  viewCount: number;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}
