import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './core/reducers/ui.reducer';
import { InjectionToken } from '@angular/core';

export interface HistoyAppState {
  [fromUI.featureKey]: fromUI.UIState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<HistoyAppState, Action>>('Root reducers token', {
  factory: () => ({
    [fromUI.featureKey]: fromUI.reducer,
  }),
});
// UI state selectors
export const selectUIState = createFeatureSelector<fromUI.UIState>(fromUI.featureKey);
export const selectWatchedVideos = createSelector(selectUIState, fromUI.selectedWatchedVideos);
export const selectIsWatchHistoryEnabled = createSelector(selectUIState, fromUI.selectIsWatchHistoryEnabled);
