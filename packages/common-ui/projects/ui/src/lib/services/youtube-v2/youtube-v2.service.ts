import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IYoutubeSearchParams, IYoutubeSearchResult, IYoutubeService } from '../../models';
import { APP_CONFIG } from '../../tokens';

@Injectable({ providedIn: 'root' })
export class YoutubeServiceV2 implements IYoutubeService {
  constructor(@Inject(APP_CONFIG) private readonly appConfig: any, private http: HttpClient) {}

  public searchList(params: IYoutubeSearchParams): Observable<IYoutubeSearchResult> {
    const { query } = params;
    const url = `${this.appConfig.backendUrl}/api/v2/youtube/searchList?q=${query}`;
    return this.http.get<IYoutubeSearchResult>(url);
  }
}
