import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MiniVideoPayload, WebApiService, LocalStorageEnum } from '@youtube/common-ui';
import { Observable } from 'rxjs';
import { selectIsMiniPlayerMode, selectMiniPlayerVideo, selectVideoSearchQuery } from '../../../reducers';
import { VideoActions } from '../../actions';

@Injectable({ providedIn: 'root' })
export class VideoStoreService {
  constructor(private store: Store, private webApiService: WebApiService) {}

  public setSearchQuery(query: string): void {
    this.store.dispatch(VideoActions.setVideoSearchQuery({ payload: query }));
  }

  public selectSearchQuery(): Observable<string> {
    return this.store.select(selectVideoSearchQuery);
  }

  public setIsMiniPlayerMode(enable: boolean): void {
    this.store.dispatch(VideoActions.setIsMiniPlayerMode({ payload: enable }));
  }

  public selectIsMiniPlayerMode(): Observable<boolean> {
    return this.store.select(selectIsMiniPlayerMode);
  }

  public setMiniPlayerVideo(payload: MiniVideoPayload): void {
    this.store.dispatch(VideoActions.setMiniPlayerVideo({ payload }));
    this.saveMiniVideoSettings(payload);
  }

  public selectMiniPlayerVideo(): Observable<MiniVideoPayload> {
    return this.store.select(selectMiniPlayerVideo);
  }

  // save mini video settings so on page reload to show it again
  private saveMiniVideoSettings(videoPayload: MiniVideoPayload | undefined): void {
    if (videoPayload?.videoId && videoPayload?.startSeconds) {
      this.webApiService.localStorage.setItem(LocalStorageEnum.MINI_WIDEO_SETTINGS, JSON.stringify(videoPayload));
    } else {
      this.webApiService.localStorage.removeItem(LocalStorageEnum.MINI_WIDEO_SETTINGS);
    }
  }
}
