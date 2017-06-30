import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';

import { IngesterApiService } from '../../services/ingester/ingester-api.service';
import {
  USERS_LIST_REQUEST, UsersListFailureAction, UsersListSuccessAction,
  USER_SAVE_REQUEST, UserSaveSuccessAction, UserSaveFailureAction,
  USER_DELETE_REQUEST, UserDeleteFailureAction, UserDeleteSuccessAction,
} from './actions';
import { DbUser } from '../../services/ingester/models';
import { IAppState } from '../reducer';
import { USERS_LIST_FIELDS } from './models';


@Injectable()
export class UserEffects {

  constructor(private action$: Actions,
              private state$: Store<IAppState>,
              private api: IngesterApiService) {
  }

  // noinspection JSUnusedGlobalSymbols
  @Effect({dispatch: true})
  listUsers: Observable<Action> = this.action$
    .ofType(USERS_LIST_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.users.updating)
    .map(([action, state]) => action.payload)
    .switchMap(() => {
      const users$: Observable<DbUser[]> = this.api.getObjectList(DbUser,
        {nopaging: true, fields: {users: USERS_LIST_FIELDS}});
      return users$
        .map(users => new UsersListSuccessAction(users))
        .catch((err) => of(new UsersListFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  saveUser$: Observable<Action> = this.action$
    .ofType(USER_SAVE_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.users.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.saveObject(DbUser, action.payload)
        .map((user) => new UserSaveSuccessAction(user))
        .catch((err) => of(new UserSaveFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  deleteUser$: Observable<Action> = this.action$
    .ofType(USER_DELETE_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.users.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.deleteObject(DbUser, action.payload)
        .map(() => new UserDeleteSuccessAction(action.payload))
        .catch((err) => of(new UserDeleteFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

}
