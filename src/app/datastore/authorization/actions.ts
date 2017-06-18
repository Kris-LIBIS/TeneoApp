import { Action } from '@ngrx/store';
import { IAuthorizationRequest, ITokenData } from '../../services/authorization/authorization.service';

export const AUTH_REQUEST = '[Authorization] request';
export const AUTH_SUCCESS = '[Authorization] success';
export const AUTH_FAILURE = '[Authorization] failure';
export const AUTH_LOGOUT = '[Authorization] logout';

export class AuthRequestAction implements Action {
  readonly type = AUTH_REQUEST;

  constructor(public payload: IAuthorizationRequest) {}
}

export class AuthSuccessAction implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: ITokenData) {}
}

export class AuthFailureAction implements Action {
  readonly type = AUTH_FAILURE;

  constructor(public payload: ITokenData) {}
}

export class AuthLogoutAction implements Action {
  readonly type = AUTH_LOGOUT;
}

export type AuthActions = AuthRequestAction | AuthSuccessAction | AuthFailureAction | AuthLogoutAction;
