import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from '../actions';
import { AppTheme } from '../services/theme-service/theme.constants';

export const featureKey = 'settings';

export interface SettingsState {
  theme: AppTheme;
}

const initialState: SettingsState = {
  theme: AppTheme.DARK,
};

export const reducer = createReducer(
  initialState,
  on(SettingsActions.setTheme, (state, payload) => ({
    ...state,
    theme: payload.theme,
  }))
);

export const selectSettingsTheme = (state: SettingsState): AppTheme => state.theme;
