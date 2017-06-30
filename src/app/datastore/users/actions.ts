import { Action } from '@ngrx/store';
import { DbUser } from '../../services/ingester/models';
import { IUserInfo } from './models';

// ----------------------------------------------------------------------------
// --  Users List: get a summary list of users
// ----------------------------------------------------------------------------

export const USERS_LIST_REQUEST = '[Users] List request';
export const USERS_LIST_SUCCESS = '[Users] List success';
export const USERS_LIST_FAILURE = '[Users] List failure';

export class UsersListRequestAction implements Action {
  readonly type = USERS_LIST_REQUEST;

  constructor(public payload: { force?: boolean }) {
  }
}

export class UsersListSuccessAction implements Action {
  readonly type = USERS_LIST_SUCCESS;

  constructor(public payload: DbUser[]) {
  }
}

export class UsersListFailureAction implements Action {
  readonly type = USERS_LIST_FAILURE;

  constructor(public payload: any) {
  }
}

// ----------------------------------------------------------------------------
// -- User Load: load full user info from the API server
// ----------------------------------------------------------------------------

export const USER_LOAD_SUCCESS = '[User] Load success';
export const USER_LOAD_FAILURE = '[User] Load failure';

export class UserLoadSuccessAction implements Action {
  readonly type = USER_LOAD_SUCCESS;

  constructor(public payload: DbUser) {
  }
}

export class UserLoadFailureAction implements Action {
  readonly type = USER_LOAD_FAILURE;

  constructor(public payload: any) {
  }
}

// ----------------------------------------------------------------------------
// -- User Save: save updated user info on the API server
// ----------------------------------------------------------------------------

export const USER_SAVE_REQUEST = '[User] Save request';
export const USER_SAVE_SUCCESS = '[User] Save success';
export const USER_SAVE_FAILURE = '[User] Save failure';

export class UserSaveRequestAction implements Action {
  readonly type = USER_SAVE_REQUEST;

  constructor(public payload: IUserInfo) {
  }
}

export class UserSaveSuccessAction implements Action {
  readonly type = USER_SAVE_SUCCESS;

  constructor(public payload: DbUser) {
  }
}

export class UserSaveFailureAction implements Action {
  readonly type = USER_SAVE_FAILURE;

  constructor(public payload: any) {
  }
}

// ----------------------------------------------------------------------------
// -- User Delete: user will be deleted from the API server
// ----------------------------------------------------------------------------

export const USER_DELETE_REQUEST = '[User] Delete request';
export const USER_DELETE_SUCCESS = '[User] Delete success';
export const USER_DELETE_FAILURE = '[User] Delete failure';

export class UserDeleteRequestAction implements Action {
  readonly type = USER_DELETE_REQUEST;

  constructor(public payload: IUserInfo) {
  }
}

export class UserDeleteSuccessAction implements Action {
  readonly type = USER_DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UserDeleteFailureAction implements Action {
  readonly type = USER_DELETE_FAILURE;

  constructor(public payload: any) {
  }
}

export type UsersActions =
  UsersListRequestAction | UsersListSuccessAction | UsersListFailureAction |
  UserLoadSuccessAction | UserLoadFailureAction |
  UserSaveRequestAction | UserSaveSuccessAction | UserSaveFailureAction |
  UserDeleteRequestAction | UserDeleteSuccessAction | UserDeleteFailureAction;
