import { createAction, props } from '@ngrx/store';
import { AppTheme } from '../services/theme-service/theme.constants';

export const setTheme = createAction('[SHELL] Set Theme', props<{ theme: AppTheme }>());
