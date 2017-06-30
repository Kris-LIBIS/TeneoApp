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
  ORGS_LIST_REQUEST, OrganizationsListSuccessAction, OrganizationsListFailureAction,
  ORG_SAVE_REQUEST, OrganizationSaveSuccessAction, OrganizationSaveFailureAction,
  ORG_DELETE_REQUEST, OrganizationDeleteSuccessAction, OrganizationDeleteFailureAction,
} from './actions';
import { DbOrganization } from '../../services/ingester/models';
import { IAppState } from '../reducer';
import { ORGS_LIST_FIELDS } from './models';


@Injectable()
export class OrganizationEffects {

  constructor(private action$: Actions,
              private state$: Store<IAppState>,
              private api: IngesterApiService) {
  }

  // noinspection JSUnusedGlobalSymbols
  @Effect({dispatch: true})
  listOrganizations$: Observable<Action> = this.action$
    .ofType(ORGS_LIST_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.organizations.updating)
    .map(([action, state]) => action.payload)
    .switchMap(() => {
      const orgs$: Observable<DbOrganization[]> = this.api.getObjectList(DbOrganization,
        {nopaging: true, fields: {organizations: ORGS_LIST_FIELDS}});
      return orgs$
        .map(orgs => new OrganizationsListSuccessAction(orgs))
        .catch((err) => of(new OrganizationsListFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  saveOrganization$: Observable<Action> = this.action$
    .ofType(ORG_SAVE_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.organizations.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.saveObject(DbOrganization, action.payload)
        .map((org) => new OrganizationSaveSuccessAction(org))
        .catch((err) => of(new OrganizationSaveFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  deleteOrganization$: Observable<Action> = this.action$
    .ofType(ORG_DELETE_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => !state.organizations.updating)
    .map(([action, state]) => action)
    .switchMap((action) => {
      return this.api.deleteObject(DbOrganization, action.payload)
        .map(() => new OrganizationDeleteSuccessAction(action.payload))
        .catch((err) => of(new OrganizationDeleteFailureAction({error: {type: 'Error', message: err.toString()}})));
    });

}
