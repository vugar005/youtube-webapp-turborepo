import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IYoutubeSearchResult } from '../../models';
import { IYoutubeSearchParams, IYoutubeService } from '../../models/youtube.service.model';
import { YOUTUBE_API_KEY } from '../../tokens/youtube-api-key.token';
import { YT_BASE_URL } from './youtube-service.constants';

@Injectable({ providedIn: 'root' })
export class YoutubeService implements IYoutubeService {
  constructor(@Inject(YOUTUBE_API_KEY) private apiKey: string, private http: HttpClient) {}

  public searchVideoResults(params: IYoutubeSearchParams): Observable<IYoutubeSearchResult[]> {
    const { query, maxResults, safeSearch } = params;
    const url = `${YT_BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&safeSearch=${safeSearch}&key=${this.apiKey}`;
    return this.http.get<IYoutubeSearchResult[]>(url);
  }
}
