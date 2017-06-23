import { Action } from '@ngrx/store';
import { DbOrganization } from '../../services/ingester/models';
import { CollectionModel } from 'ng-jsonapi/dist/models/collection.model';
import { IOrganizationInfo } from './models';

export const ORGS_LOAD_REQUEST = '[Organizations] Load request';
export const ORGS_LOAD_SUCCESS = '[Organizations] Load success';
export const ORGS_LOAD_FAILURE = '[Organizations] Load failure';

export class OrganizationsLoadRequestAction implements Action {
  readonly type = ORGS_LOAD_REQUEST;

  constructor(public payload: { force?: boolean, page?: number, per_page?: number, more?: boolean }) {
  }
}

export class OrganizationsLoadSuccessAction implements Action {
  readonly type = ORGS_LOAD_SUCCESS;

  constructor(public payload: { collection: CollectionModel<DbOrganization>, append?: boolean }) {
  }
}

export class OrganizationsLoadFailureAction implements Action {
  readonly type = ORGS_LOAD_FAILURE;

  constructor(public payload: any) {
  }
}

export const ORG_SAVE_REQUEST = '[Organization] Save request';
export const ORG_SAVE_SUCCESS = '[Organization] Save success';
export const ORG_SAVE_FAILURE = '[Organization] Save failure';

export class OrganizationSaveRequestAction implements Action {
  readonly type = ORG_SAVE_REQUEST;

  constructor(public payload: IOrganizationInfo) {
  }
}

export class OrganizationSaveSuccessAction implements Action {
  readonly type = ORG_SAVE_SUCCESS;

  constructor(public payload: DbOrganization) {
  }
}

export class OrganizationSaveFailureAction implements Action {
  readonly type = ORG_SAVE_FAILURE;

  constructor(public payload: any) {
  }
}

export const ORG_DELETE_REQUEST = '[Organization] Delete request';
export const ORG_DELETE_SUCCESS = '[Organization] Delete success';
export const ORG_DELETE_FAILURE = '[Organization] Delete failure';

export class OrganizationDeleteRequestAction implements Action {
  readonly type = ORG_DELETE_REQUEST;

  constructor(public payload: IOrganizationInfo) {
  }
}

export class OrganizationDeleteSuccessAction implements Action {
  readonly type = ORG_DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class OrganizationDeleteFailureAction implements Action {
  readonly type = ORG_DELETE_FAILURE;

  constructor(public payload: any) {
  }
}

export type OrganizationsActions =
  OrganizationsLoadRequestAction | OrganizationsLoadSuccessAction | OrganizationsLoadFailureAction |
  OrganizationSaveRequestAction | OrganizationSaveSuccessAction | OrganizationSaveFailureAction |
  OrganizationDeleteRequestAction | OrganizationDeleteSuccessAction | OrganizationDeleteFailureAction;
