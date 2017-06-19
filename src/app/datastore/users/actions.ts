import { Action } from '@ngrx/store';

export const USERS_LOAD_REQUEST = '[Users] Load request';
export const USERS_LOAD_SUCCESS = '[Users] Load success';
export const USERS_LOAD_FAILURE = '[Users] Load failure';

export class UsersLoadRequestAction implements Action {
  readonly type = USERS_LOAD_REQUEST;
  constructor(public payload: boolean = false) {}
}

export class UsersLoadSuccessAction implements Action {
  readonly type = USERS_LOAD_SUCCESS;
  constructor(public payload: any[]) {}
}

export class UsersLoadFailureAction implements Action {
  readonly type = USERS_LOAD_FAILURE;
  constructor(public payload: any) {}
}

export type UsersActions = UsersLoadRequestAction | UsersLoadSuccessAction | UsersLoadFailureAction;
