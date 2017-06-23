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
  ORG_DELETE_REQUEST,
  ORG_SAVE_REQUEST, OrganizationDeleteFailureAction, OrganizationDeleteSuccessAction, OrganizationSaveFailureAction,
  OrganizationSaveSuccessAction,
  OrganizationsLoadFailureAction,
  OrganizationsLoadSuccessAction,
  ORGS_LOAD_REQUEST
} from './actions';
import { DbOrganization } from '../../services/ingester/models';
import { IAppState } from '../reducer';
import { CollectionModel } from 'ng-jsonapi/dist/models/collection.model';


@Injectable()
export class OrganizationEffects {

  constructor(private action$: Actions,
              private state$: Store<IAppState>,
              private api: IngesterApiService) {
  }

  // noinspection JSUnusedGlobalSymbols
  @Effect({dispatch: true})
  loadOrganizations: Observable<Action> = this.action$
    .ofType(ORGS_LOAD_REQUEST)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.organizations.updating)
    .map(([action, state]) => action.payload)
    .switchMap((payload) => {
      const orgs$: Observable<CollectionModel<DbOrganization>> = this.api.getCollection(DbOrganization, payload.page, payload.per_page);
      return orgs$
        .map(orgs => new OrganizationsLoadSuccessAction({collection: orgs, append: (payload.more)}))
        .catch((err) => of(new OrganizationsLoadFailureAction({error: {type: 'Error', message: err.toString()}})));
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
