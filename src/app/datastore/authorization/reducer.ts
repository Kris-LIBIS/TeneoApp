
import * as ud from 'updeep';
import { ITokenData } from '../../services/authorization/authorization.service';
import { IAuthState, INITIAL_AUTH_STATE } from './models';
import { AUTH_FAILURE, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS, AuthActions } from './actions';

export function authReducer(state: IAuthState = ud.freeze(INITIAL_AUTH_STATE), action: AuthActions) {
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
      return INITIAL_AUTH_STATE;
    }

    case AUTH_LOGOUT: {
      return INITIAL_AUTH_STATE;
    }

    default:
      return state;
  }
}
