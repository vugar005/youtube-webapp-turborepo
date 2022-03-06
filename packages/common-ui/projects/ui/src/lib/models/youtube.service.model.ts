import { Observable } from 'rxjs';
import { IYoutubeSearchResult } from '.';

export interface IYoutubeService {
  searchVideoResults: (params: IYoutubeSearchParams) => Observable<IYoutubeSearchResult[]>;
}

export interface IYoutubeSearchParams {
  query: string;
  maxResults?: number;
  safeSearch?: 'none' | 'moderate' | 'strict';
}
