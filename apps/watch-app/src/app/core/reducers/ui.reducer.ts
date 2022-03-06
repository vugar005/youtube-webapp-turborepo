import { createReducer, on } from '@ngrx/store';
import { UIActions } from '../actions';

export const featureKey = 'UI';

export interface UIState {
  likedVideoList: string[];
  dislikedVideoList: string[];
}

const initialState: UIState = {
  likedVideoList: [],
  dislikedVideoList: [],
};

export const reducer = createReducer(
  initialState,
  on(UIActions.setLikedVideosList, (state, payload) => {
    const likedVideoIds = payload.videoIds;
    return {
      ...state,
      likedVideoList: likedVideoIds,
    };
  }),
  on(UIActions.setDislikedVideosList, (state, payload) => {
    const dislikedVideoIds = payload.videoIds;
    return {
      ...state,
      dislikedVideoList: dislikedVideoIds,
    };
  })
);

export const selectLikedVideos = (state: UIState): string[] => state.likedVideoList;
export const selectDislikedVideos = (state: UIState): string[] => state.dislikedVideoList;
