import { createReducer, on } from '@ngrx/store';
import { VideoActions } from '../actions';

export const featureKey = 'video';

interface IMiniPlayerVideo {
  videoId: string | null;
  startSeconds: number;
}
export interface VideoState {
  searchQuery: string;
  isMiniPlayerEnabled: boolean;
  miniPlayerVideo: IMiniPlayerVideo;
}

const initialState: VideoState = {
  searchQuery: 'jay aliyev roudeep',
  isMiniPlayerEnabled: false,
  miniPlayerVideo: {
    videoId: null,
    startSeconds: 0,
  },
};

export const reducer = createReducer(
  initialState,
  on(VideoActions.setVideoSearchQuery, (state, action) => ({
    ...state,
    searchQuery: action.payload,
  })),
  on(VideoActions.setIsMiniPlayerMode, (state, action) => ({
    ...state,
    isMiniPlayerEnabled: action.payload,
  })),
  on(VideoActions.setMiniPlayerVideo, (state, action) => ({
    ...state,
    miniPlayerVideo: {
      videoId: action.payload.videoId,
      startSeconds: action.payload.startSeconds || 0,
    },
  }))
);

export const selectSearchQuery = (state: VideoState): string => state.searchQuery;
export const selectVideoIsMiniPlayerMode = (state: VideoState): boolean => state.isMiniPlayerEnabled;
export const selectVideoMiniPlayerVideo = (state: VideoState): IMiniPlayerVideo => state.miniPlayerVideo;
