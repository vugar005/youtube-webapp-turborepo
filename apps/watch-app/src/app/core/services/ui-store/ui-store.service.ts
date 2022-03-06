import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLikedVideosList, setDislikedVideosList } from '../../actions/ui.actions';
import { selectLikedVideos, selectDislikedVideos } from '../../../reducers';

@Injectable({ providedIn: 'root' })
export class UIStoreService {
  constructor(private store: Store) {}

  public selectLikedVideos(): Observable<string[]> {
    return this.store.select(selectLikedVideos);
  }

  public selectDislikedVideos(): Observable<string[]> {
    return this.store.select(selectDislikedVideos);
  }

  public setLikedVideosList(payload: { videoIds: string[] }): void {
    this.store.dispatch(setLikedVideosList(payload));
  }

  public setDislikedVideosList(payload: { videoIds: string[] }): void {
    this.store.dispatch(setDislikedVideosList(payload));
  }
}
