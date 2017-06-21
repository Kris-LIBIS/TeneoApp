import { Action } from '@ngrx/store';
import { IUserInfo } from "./reducer";
import { DbUser } from "../../services/ingester/models";

export const USERS_LOAD_REQUEST = '[Users] Load request';
export const USERS_LOAD_SUCCESS = '[Users] Load success';
export const USERS_LOAD_FAILURE = '[Users] Load failure';

export class UsersLoadRequestAction implements Action {
  readonly type = USERS_LOAD_REQUEST;

  constructor(public payload: boolean = false) {
  }
}

export class UsersLoadSuccessAction implements Action {
  readonly type = USERS_LOAD_SUCCESS;

  constructor(public payload: DbUser[]) {
  }
}

export class UsersLoadFailureAction implements Action {
  readonly type = USERS_LOAD_FAILURE;

  constructor(public payload: any) {
  }
}

export const USERS_SAVE_REQUEST = '[Users] Save request';
export const USERS_SAVE_SUCCESS = '[Users] Save success';
export const USERS_SAVE_FAILURE = '[Users] Save failure';

export class UsersSaveRequestAction implements Action {
  readonly type = USERS_SAVE_REQUEST;

  constructor(public payload: IUserInfo) {
  }
}

export class UsersSaveSuccessAction implements Action {
  readonly type = USERS_SAVE_SUCCESS;

  constructor(public payload: DbUser) {
  }
}

export class UsersSaveFailureAction implements Action {
  readonly type = USERS_SAVE_FAILURE;

  constructor(public payload: any) {
  }
}

export const USERS_ADD_REQUEST = '[Users] Add request';
export const USERS_ADD_SUCCESS = '[Users] Add success';
export const USERS_ADD_FAILURE = '[Users] Add failure';

export class UsersAddRequestAction implements Action {
  readonly type = USERS_ADD_REQUEST;

  constructor(public payload: IUserInfo) {
  }
}

export class UsersAddSuccessAction implements Action {
  readonly type = USERS_ADD_SUCCESS;

  constructor(public payload: IUserInfo) {
  }
}

export class UsersAddFailureAction implements Action {
  readonly type = USERS_ADD_FAILURE;

  constructor(public payload: any) {
  }
}

export const USERS_DELETE_REQUEST = '[Users] Delete request';
export const USERS_DELETE_SUCCESS = '[Users] Delete success';
export const USERS_DELETE_FAILURE = '[Users] Delete failure';

export class UsersDeleteRequestAction implements Action {
  readonly type = USERS_DELETE_REQUEST;

  constructor(public payload: IUserInfo) {
  }
}

export class UsersDeleteSuccessAction implements Action {
  readonly type = USERS_DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UsersDeleteFailureAction implements Action {
  readonly type = USERS_DELETE_FAILURE;

  constructor(public payload: any) {
  }
}

export type UsersActions =
  UsersLoadRequestAction | UsersLoadSuccessAction | UsersLoadFailureAction |
  UsersSaveRequestAction | UsersSaveSuccessAction | UsersSaveFailureAction |
  UsersAddRequestAction | UsersAddSuccessAction | UsersAddFailureAction |
  UsersDeleteRequestAction | UsersDeleteSuccessAction | UsersDeleteFailureAction;
