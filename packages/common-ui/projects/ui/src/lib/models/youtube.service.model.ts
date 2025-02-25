import { Observable } from 'rxjs';
import { IYoutubeSearchResult } from './youtube-search-list.model';
import { IYoutubeVideoResult } from './youtube-video-list.model';

export interface IYoutubeService {
  searchList: (params: IYoutubeSearchParams) => Observable<IYoutubeSearchResult>;
  videoList: (params: IYoutubeVideoListParams) => Observable<IYoutubeVideoResult[]>;
  warmUp: () => Observable<void>;
}

export interface IYoutubeSearchParams {
  query: string;
  maxResults?: number;
  safeSearch?: 'none' | 'moderate' | 'strict';
}

export interface IYoutubeVideoListParams {
  query?: string;
  part?: string;
  id?: string;
}
