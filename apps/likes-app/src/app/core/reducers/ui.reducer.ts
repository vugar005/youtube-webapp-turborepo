import { createReducer, on } from '@ngrx/store';
import { UIActions } from '../actions';

export const featureKey = 'UI';

export interface UIState {
  likedVideoList: string[];
}

const initialState: UIState = {
  likedVideoList: [],
};

export const reducer = createReducer(
  initialState,
  on(UIActions.setLikedVideosList, (state, payload) => {
    const likedVideoIds = payload.videoIds;
    return {
      ...state,
      likedVideoList: likedVideoIds,
    };
  })
);

export const selectLikedVideos = (state: UIState): string[] => state.likedVideoList;
