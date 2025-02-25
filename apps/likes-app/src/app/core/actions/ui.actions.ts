import { createAction, props } from '@ngrx/store';

export const setLikedVideosList = createAction('[LIKED APP] Add video to Liked list', props<{ videoIds: string[] }>());
