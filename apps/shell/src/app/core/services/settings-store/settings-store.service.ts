import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTheme } from '../../../reducers';
import { setTheme } from '../../actions/settings.actions';
import { AppTheme } from '../theme-service/theme.constants';

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  constructor(private store: Store) {}

  public selectTheme(): Observable<AppTheme | null> {
    return this.store.select(selectTheme);
  }

  public setTheme(theme: AppTheme): void {
    this.store.dispatch(setTheme({ theme }));
  }
}
