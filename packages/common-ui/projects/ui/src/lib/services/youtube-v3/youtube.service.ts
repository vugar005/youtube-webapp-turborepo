import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IYoutubeSearchResult, IYoutubeVideoResult } from '../../models';
import { IYoutubeSearchParams, IYoutubeService, IYoutubeVideoListParams } from '../../models/youtube.service.model';
import { YT_BASE_URL } from './youtube-service.constants';

@Injectable({ providedIn: 'root' })
export class YoutubeService implements IYoutubeService {
  constructor(private http: HttpClient) {}

  public searchList(params: IYoutubeSearchParams): Observable<IYoutubeSearchResult> {
    const { query, maxResults = 10, safeSearch = 'moderate' } = params;
    const apiKey = ``;
    const url = `${YT_BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&safeSearch=${safeSearch}&key=${apiKey}`;
    return this.http.get<IYoutubeSearchResult>(url);
  }

  public videoList(params: IYoutubeVideoListParams): Observable<IYoutubeVideoResult[]> {
    const { part = 'id, snippet,statistics, contentDetails', id } = params;
    const apiKey = ``;
    const url = `${YT_BASE_URL}/videos?part=${part}&id=${id}&key=${apiKey}`;
    return this.http.get<IYoutubeVideoResult[]>(url);
  }
}
