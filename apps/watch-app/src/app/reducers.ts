import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './core/reducers/ui.reducer';
import { InjectionToken } from '@angular/core';

export interface WatchAppState {
  [fromUI.featureKey]: fromUI.UIState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<WatchAppState, Action>>('Root reducers token', {
  factory: () => ({
    [fromUI.featureKey]: fromUI.reducer,
  }),
});
// UI state selectors
export const selectUIState = createFeatureSelector<fromUI.UIState>(fromUI.featureKey);
export const selectLikedVideos = createSelector(selectUIState, fromUI.selectLikedVideos);
export const selectDislikedVideos = createSelector(selectUIState, fromUI.selectDislikedVideos);
