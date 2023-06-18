import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { IAppConfig, IYoutubeSearchResult, IYoutubeVideoResult } from '../../models';
import { IYoutubeSearchParams, IYoutubeService, IYoutubeVideoListParams } from '../../models/youtube.service.model';
import { APP_CONFIG } from '../../tokens';
import { YT_BASE_URL } from './youtube-service.constants';

@Injectable({ providedIn: 'root' })
export class YoutubeService implements IYoutubeService {
  constructor(@Inject(APP_CONFIG) private readonly appConfig: IAppConfig, private http: HttpClient) {}

  public searchList(params: IYoutubeSearchParams): Observable<IYoutubeSearchResult> {
    const { query, maxResults = 10, safeSearch = 'moderate' } = params;
    const { apiKey } = this.appConfig;
    const url = `${YT_BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&safeSearch=${safeSearch}&key=${apiKey}`;
    return this.http.get<IYoutubeSearchResult>(url);
  }

  public videoList(params: IYoutubeVideoListParams): Observable<IYoutubeVideoResult[]> {
    const { part = 'id, snippet,statistics, contentDetails', id } = params;
    const { apiKey } = this.appConfig;
    const url = `${YT_BASE_URL}/videos?part=${part}&id=${id}&key=${apiKey}`;
    return this.http.get<IYoutubeVideoResult[]>(url);
  }

  public warmUp(): Observable<void> {
    return EMPTY;
  }
}
