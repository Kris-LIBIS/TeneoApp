import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AuthActions } from './actions';

import * as ud from 'updeep';
import { ITokenData } from '../../services/authorization/authorization.service';

export interface IAuthState {
  authorized: boolean;
  userName: string;
  jwtToken: string;
  updating: boolean;
}

export const INITIAL_AUTH_STATE: IAuthState = {
  authorized: false,
  userName: undefined,
  jwtToken: undefined,
  updating: false
};

export function authReducer(state: IAuthState = INITIAL_AUTH_STATE, action: AuthActions) {
  const updateState = ud(ud._, state);
  switch (action.type) {
    case AUTH_REQUEST: {
      return updateState({updating: true});
    }

    case AUTH_SUCCESS: {
      const result: ITokenData = action.payload;
      return updateState({
        updating: false,
        authorized: true,
        userName: result.user.name,
        jwtToken: result.token
      });
    }

    case AUTH_FAILURE: {
      const result: ITokenData = action.payload;
      return updateState({
        updating: false,
        authorized: false,
        userName: undefined,
        jwtToken: undefined
      })
    }

    default:
      return state;
  }
}
