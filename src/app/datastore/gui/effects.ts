import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store'
import { GUI_SELECT_USER, GUI_VALID_ROUTE, GuiSelectOrgOptions } from './actions';
import { IAppState } from '../reducer';
import { IngesterApiService } from '../../services/ingester/ingester-api.service';
import { DbOrganization } from '../../services/ingester/models';
import { dbOrganization2organizationInfo } from '../organizations/models';
import { IUserInfo } from '../users/models';

@Injectable()
export class GuiEffects {
  constructor(private action$: Actions,
              private state$: Store<IAppState>,
              private api: IngesterApiService) {
  }

  //noinspection JSUnusedGlobalSymbols
  @Effect()
  valid_route$: Observable<Action> = this.action$.ofType(GUI_VALID_ROUTE)
    .withLatestFrom(this.state$, (action, state) => {
      return {
        authorized: state.authorization.authorized,
        last_route: state.router.path
      };
    })
    .map(data => data.authorized ? go(data.last_route) : go('/home'));

  //noinspection JSUnusedGlobalSymbols
  @Effect()
  selectUser$: Observable<Action> = this.action$.ofType(GUI_SELECT_USER)
    .map((action) => action.payload)
    .switchMap((user: IUserInfo) =>
      this.api.getHasMany(DbOrganization, user.links.organizations)
        .map(dbOrgs => new GuiSelectOrgOptions(dbOrgs.map(dbOrg => dbOrganization2organizationInfo(dbOrg))))
    );


}
