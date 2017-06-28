import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store'
import { GUI_VALID_ROUTE } from './actions';
import { IAppState } from '../reducer';

@Injectable()
export class GuiEffects {
  constructor(
    private action$: Actions,
    private state$: Store<IAppState>,
) {}

  @Effect()
  valid_route$: Observable<Action> = this.action$.ofType(GUI_VALID_ROUTE)
    .withLatestFrom(this.state$, (action, state) => {
      return {
        authorized: state.authorization.authorized,
        last_route: state.router.path
      };
    })
    .map(data => data.authorized ? go(data.last_route) : go('/home'));

}
