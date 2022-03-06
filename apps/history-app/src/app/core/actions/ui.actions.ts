import { createAction, props } from '@ngrx/store';

export const setWatchedVideosList = createAction(
  '[History APP] Set Watched Videos List',
  props<{ videoIds: string[] }>()
);
export const setIsWatchHistoryEnabled = createAction(
  '[History APP] Set Is Watch History Enabled',
  props<{ isEnabled: boolean }>()
);
