import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAppConfig,
  IYoutubeSearchParams,
  IYoutubeSearchResult,
  IYoutubeService,
  IYoutubeVideoListParams,
  IYoutubeVideoResult,
} from '../../models';
import { APP_CONFIG } from '../../tokens';

@Injectable({ providedIn: 'root' })
export class YoutubeServiceV1 implements IYoutubeService {
  constructor(@Inject(APP_CONFIG) private readonly appConfig: IAppConfig, private http: HttpClient) {}

  public searchList(params: IYoutubeSearchParams): Observable<IYoutubeSearchResult> {
    const { query } = params;
    const url = `${this.prefix}/searchlist?q=${query}`;
    return this.http.get<IYoutubeSearchResult>(url);
  }

  public videoList(params: IYoutubeVideoListParams): Observable<IYoutubeVideoResult[]> {
    const { id } = params;
    const url = `${this.prefix}/videolist?id=${id}`;
    return this.http.get<IYoutubeVideoResult[]>(url);
  }

  public warmUp(): Observable<void> {
    const url = `${this.appConfig.backendUrl}/api/manual_warmup`;
    return this.http.get<any>(url);
  }

  private get prefix(): string {
    return `${this.appConfig.backendUrl}/api/v1/youtube`;
  }
}
