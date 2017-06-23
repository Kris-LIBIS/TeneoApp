import { Injectable} from '@angular/core';
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
  USERS_DELETE_REQUEST,
  USERS_LOAD_REQUEST,
  USERS_SAVE_REQUEST,
  UsersDeleteFailureAction,
  UsersDeleteSuccessAction,
  UsersLoadFailureAction, UsersLoadSuccessAction,
  UsersSaveFailureAction,
  UsersSaveSuccessAction
} from './actions';
import { DbUser } from '../../services/ingester/models';
import { IAppState } from '../reducer';
import { CollectionModel } from 'ng-jsonapi/dist/models/collection.model';


@Injectable()
export class UserEffects {

  constructor(private action$: Actions,
              private state$: Store<IAppState>,
              private api: IngesterApiService) {
  }

  // noinspection JSUnusedGlobalSymbols
  @Effect({dispatch: true})
  loadUsers: Observable<Action> = this.action$
    .ofType(USERS_LOAD_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.users.updating)
    .map(([action, state]) => action.payload)
    .switchMap((payload) => {
      const users$: Observable<CollectionModel<DbUser>> = this.api.getCollection(DbUser, payload.page, payload.per_page);
      return users$
        .map(users => new UsersLoadSuccessAction({collection: users, append: (payload.more)}))
        .catch((err) => of(new UsersLoadFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  saveUser$: Observable<Action> = this.action$
    .ofType(USERS_SAVE_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.users.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.saveObject(DbUser, action.payload)
        .map((user) => new UsersSaveSuccessAction(user))
        .catch((err) => of(new UsersSaveFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  deleteUser$: Observable<Action> = this.action$
    .ofType(USERS_DELETE_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.users.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.deleteObject(DbUser, action.payload)
        .map(() => new UsersDeleteSuccessAction(action.payload))
        .catch((err) => of(new UsersDeleteFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

}
