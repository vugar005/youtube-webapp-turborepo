import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLikedVideosList } from '../../actions/ui.actions';
import { selectLikedVideos } from '../../../reducers';

@Injectable({ providedIn: 'root' })
export class UIStoreService {
  constructor(private store: Store) {}

  public selectLikedVideos(): Observable<string[]> {
    return this.store.select(selectLikedVideos);
  }

  public setLikedVideosList(payload: { videoIds: string[] }): void {
    this.store.dispatch(setLikedVideosList(payload));
  }
}
