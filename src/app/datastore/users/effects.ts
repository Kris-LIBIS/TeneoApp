import { Injectable, OnDestroy } from '@angular/core';
import { Actions, Effect, mergeEffects } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';

import * as _ from 'lodash';

import { IngesterApiService } from '../../services/ingester/ingester-api.service';
import {
  USERS_ADD_REQUEST, USERS_DELETE_REQUEST,
  USERS_LOAD_REQUEST, USERS_SAVE_REQUEST, UsersAddFailureAction, UsersAddSuccessAction, UsersDeleteFailureAction,
  UsersDeleteSuccessAction,
  UsersLoadFailureAction,
  UsersLoadSuccessAction,
  UsersSaveFailureAction, UsersSaveSuccessAction
} from './actions';
import { DbUser } from '../../services/ingester/models';
import { IAppState } from '../reducer';
import { Subscription } from 'rxjs/Subscription';
import { GuiMessageClearAction } from '../gui/actions';


@Injectable()
export class UserEffects implements OnDestroy {

  subscription: Subscription;

  constructor(private action$: Actions,
              private state$: Store<IAppState>,
              private api: IngesterApiService) {
    this.subscription = mergeEffects(this).subscribe(state$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  load$: Observable<Action> = this.action$
    .ofType(USERS_LOAD_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.users.updating)
    .switchMap(() => {
      // const nextLoad$ = this.action$.ofType(USERS_LOAD_REQUEST).skip(1);
      const users$: Observable<DbUser[]> = this.api.getObjectList(DbUser);
      // return users$.takeUntil(nextLoad$)
      return users$
        .map((users) => users.length === 0 ? new GuiMessageClearAction : new UsersLoadSuccessAction(users))
        .catch((err) => of(new UsersLoadFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  @Effect()
  update$: Observable<Action> = this.action$
    .ofType(USERS_SAVE_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.users.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.saveObject(DbUser, action.payload)
        .map((user) => new UsersSaveSuccessAction(user))
        .catch((err) => of(new UsersSaveFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  @Effect()
  add$: Observable<Action> = this.action$
    .ofType(USERS_ADD_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.users.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.saveObject(DbUser, action.payload)
        .map((user) => new UsersAddSuccessAction(user))
        .catch((err) => of(new UsersAddFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  @Effect()
  delete$: Observable<Action> = this.action$
    .ofType(USERS_DELETE_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.users.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.deleteObject(DbUser, action.payload)
        .map((result) => result ?
          new UsersDeleteSuccessAction(action.payload) :
          new UsersDeleteFailureAction({error: {type: 'Server error', message: 'Delete action refused by server'}})
        )
        .catch((err) => of(new UsersDeleteFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

}
