import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVideo from './core/reducers/video.reducer';
import * as fromAccount from './core/reducers/account.reducer';
import * as fromSettings from './core/reducers/settings.reducer';
import { InjectionToken } from '@angular/core';

export interface AppState {
  [fromVideo.featureKey]: fromVideo.VideoState;
  [fromAccount.featureKey]: fromAccount.AccountState;
  [fromSettings.featureKey]: fromSettings.SettingsState;
  [fromSettings.featureKey]: fromSettings.SettingsState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
  factory: () => ({
    [fromVideo.featureKey]: fromVideo.reducer,
    [fromAccount.featureKey]: fromAccount.reducer,
    [fromSettings.featureKey]: fromSettings.reducer,
  }),
});

// Video state selectors
export const selectVideoState = createFeatureSelector<fromVideo.VideoState>(fromVideo.featureKey);
export const selectVideoSearchQuery = createSelector(selectVideoState, fromVideo.selectSearchQuery);
export const selectIsMiniPlayerMode = createSelector(selectVideoState, fromVideo.selectVideoIsMiniPlayerMode);
export const selectMiniPlayerVideo = createSelector(selectVideoState, fromVideo.selectVideoMiniPlayerVideo);

// Account state selectors
export const selectAccountState = createFeatureSelector<fromAccount.AccountState>(fromAccount.featureKey);
export const selectLikedVideos = createSelector(selectAccountState, fromAccount.selectLikedVideos);
export const selectDislikedVideos = createSelector(selectAccountState, fromAccount.selectDislikedVideos);
export const selectedWatchedVideos = createSelector(selectAccountState, fromAccount.selectedWatchedVideos);
export const selectIsWatchHistoryEnabled = createSelector(selectAccountState, fromAccount.selectIsWatchHistoryEnabled);

// Settings state selectors
export const selectSettingsState = createFeatureSelector<fromSettings.SettingsState>(fromSettings.featureKey);
export const selectTheme = createSelector(selectSettingsState, fromSettings.selectSettingsTheme);
