import { createAction, props } from '@ngrx/store';

export const setLikedVideosList = createAction('[APP] Add video to Liked list', props<{ videoIds: string[] }>());
export const setDislikedVideosList = createAction('[APP] Add video to Dislike list', props<{ videoIds: string[] }>());
