import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions';

export const featureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
  }))
);

export const selectIsAuthenticated = (state: AuthState): boolean => state.isAuthenticated;
