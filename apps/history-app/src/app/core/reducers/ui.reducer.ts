import { createReducer, on } from '@ngrx/store';
import { UIActions } from '../actions';

export const featureKey = 'UI';

export interface UIState {
  watchedVideos: string[];
  isWatchHistoryEnabled: boolean;
}

const initialState: UIState = {
  watchedVideos: [],
  isWatchHistoryEnabled: true,
};

export const reducer = createReducer(
  initialState,
  on(UIActions.setWatchedVideosList, (state, payload) => {
    const watchedVideoIds = payload.videoIds;
    return {
      ...state,
      watchedVideos: watchedVideoIds,
    };
  }),
  on(UIActions.setIsWatchHistoryEnabled, (state, payload) => {
    const isWatchHistoryEnabled = payload.isEnabled;
    return {
      ...state,
      isWatchHistoryEnabled,
    };
  })
);

export const selectedWatchedVideos = (state: UIState): string[] => state.watchedVideos;
export const selectIsWatchHistoryEnabled = (state: UIState): boolean => state.isWatchHistoryEnabled;
