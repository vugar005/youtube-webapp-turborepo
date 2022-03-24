import { Observable } from 'rxjs';
import { IYoutubeSearchResult } from '.';

export interface IYoutubeService {
  searchList: (params: IYoutubeSearchParams) => Observable<IYoutubeSearchResult>;
}

export interface IYoutubeSearchParams {
  query: string;
  maxResults?: number;
  safeSearch?: 'none' | 'moderate' | 'strict';
}
