import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthorizationService, ITokenData } from '../../services/authorization/authorization.service';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { AUTH_FAILURE, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS, AuthFailureAction, AuthSuccessAction } from './actions';
import { of } from 'rxjs/observable/of';
import { go } from '@ngrx/router-store'
import { IAppState } from '../reducer';
import { GuiForgetUserAction, GuiSelectUserAction } from "../gui/actions";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private _store: Store<IAppState>,
    private api: AuthorizationService) {}

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  login$: Observable<Action> = this.action$.ofType(AUTH_REQUEST).switchMap((action) => {
    const result$: Observable<ITokenData> = this.api.authenticate(action.payload);
    return result$
      .map((result) => result.error ? new AuthFailureAction(result) : new AuthSuccessAction(result))
      .catch((err) => of(new AuthFailureAction({error: {type: 'Error', message: err.toString()}})));
  });

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  authSuccess$: Observable<Action> = this.action$.ofType(AUTH_SUCCESS)
    .do((action) => this._store.dispatch(new GuiSelectUserAction(action.payload.user)))
    .map(() => go('/dashboard'));

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  authFailure$: Observable<Action> = this.action$.ofType(AUTH_FAILURE)
    .do((action) => this._store.dispatch(new GuiForgetUserAction()))
    .map(() => go('/home'));

  @Effect()
  logout$: Observable<Action> = this.action$.ofType(AUTH_LOGOUT)
    .do((action) => this._store.dispatch(new GuiForgetUserAction()))
    .map(() => go('/home'));

}
