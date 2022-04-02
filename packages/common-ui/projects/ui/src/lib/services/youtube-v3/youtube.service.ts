import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IYoutubeSearchResult, IYoutubeVideoResult } from '../../models';
import { IYoutubeSearchParams, IYoutubeService, IYoutubeVideoListParams } from '../../models/youtube.service.model';
import { YOUTUBE_API_KEY } from '../../tokens/youtube-api-key.token';
import { YT_BASE_URL } from './youtube-service.constants';

@Injectable({ providedIn: 'root' })
export class YoutubeService implements IYoutubeService {
  constructor(@Inject(YOUTUBE_API_KEY) private apiKey: string, private http: HttpClient) {}

  public searchList(params: IYoutubeSearchParams): Observable<IYoutubeSearchResult> {
    const { query, maxResults = 10, safeSearch = 'moderate' } = params;
    const apiKey = ``;
    const url = `${YT_BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&safeSearch=${safeSearch}&key=${apiKey}`;
    return this.http.get<IYoutubeSearchResult>(url);
  }

  public videoList(params: IYoutubeVideoListParams): Observable<IYoutubeVideoResult> {
    const { query, part = 'id, snippet,statistics, contentDetails' } = params;
    const apiKey = ``;
    const url = `${YT_BASE_URL}/videos?part=${part}&q=${query}&id=${query}&key=${apiKey}`;
    return this.http.get<IYoutubeVideoResult>(url);
  }
}
