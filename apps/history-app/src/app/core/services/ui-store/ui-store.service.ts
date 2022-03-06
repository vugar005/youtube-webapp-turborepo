import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsWatchHistoryEnabled, selectWatchedVideos } from '../../../reducers';
import { setIsWatchHistoryEnabled, setWatchedVideosList } from '../../actions/ui.actions';

@Injectable({ providedIn: 'root' })
export class UIStoreService {
  constructor(private store: Store) {}

  public selectWatchedVideos(): Observable<string[]> {
    return this.store.select(selectWatchedVideos);
  }

  public setWatchedVideosList(payload: { videoIds: string[] }): void {
    this.store.dispatch(setWatchedVideosList(payload));
  }

  public setIsWatchHistoryEnabled(payload: { isEnabled: boolean }): void {
    this.store.dispatch(setIsWatchHistoryEnabled(payload));
  }

  public selectIsWatchHistoryEnabled(): Observable<boolean> {
    return this.store.select(selectIsWatchHistoryEnabled);
  }
}
