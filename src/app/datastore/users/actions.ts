import { Action } from '@ngrx/store';
import { DbUser } from '../../services/ingester/models';
import { CollectionModel } from 'ng-jsonapi/dist/models/collection.model';
import { IUserInfo } from './models';

export const USERS_LOAD_REQUEST = '[Users] Load request';
export const USERS_LOAD_SUCCESS = '[Users] Load success';
export const USERS_LOAD_FAILURE = '[Users] Load failure';

export class UsersLoadRequestAction implements Action {
  readonly type = USERS_LOAD_REQUEST;

  constructor(public payload: {force?: boolean, page?: number, per_page?: number, more?: boolean}) {
  }
}

export class UsersLoadSuccessAction implements Action {
  readonly type = USERS_LOAD_SUCCESS;

  constructor(public payload: {collection: CollectionModel<DbUser>, append?: boolean}  ) {
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
  UsersDeleteRequestAction | UsersDeleteSuccessAction | UsersDeleteFailureAction;
