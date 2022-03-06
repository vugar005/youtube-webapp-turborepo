import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectLikedVideos,
  selectDislikedVideos,
  selectedWatchedVideos,
  selectIsWatchHistoryEnabled,
} from '../../../reducers';
import { AccountActions } from '../../actions';
import { addVideoToHistoryList, clearWatchHistory, toggleIsWatchHistoryEnabled } from '../../actions/account.actions';

@Injectable({ providedIn: 'root' })
export class AccountStoreService {
  constructor(private store: Store) {}

  public toggleLikeVideo(payload: { videoId: string }): void {
    this.store.dispatch(AccountActions.toggleLikeVideo(payload));
  }

  public selectLikedVideoList(): Observable<string[]> {
    return this.store.select(selectLikedVideos);
  }

  public toggleDislikeVideo(payload: { videoId: string }): void {
    this.store.dispatch(AccountActions.toggleDislikeVideo(payload));
  }

  public selectDislikedVideoList(): Observable<string[]> {
    return this.store.select(selectDislikedVideos);
  }

  public selectWatchedVideos(): Observable<string[]> {
    return this.store.select(selectedWatchedVideos);
  }

  public addVideoToHistoryList(payload: { videoId: string }): void {
    this.store.dispatch(addVideoToHistoryList(payload));
  }

  public clearWatchHistory(): void {
    this.store.dispatch(clearWatchHistory());
  }

  public toggleIsWatchHistoryEnabled(payload: { isActive: boolean }): void {
    this.store.dispatch(toggleIsWatchHistoryEnabled(payload));
  }

  public selectIsWatchHistoryEnabled(): Observable<boolean> {
    return this.store.select(selectIsWatchHistoryEnabled);
  }
}
