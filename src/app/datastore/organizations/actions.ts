import { Action } from '@ngrx/store';
import { DbOrganization } from '../../services/ingester/models';
import { CollectionModel } from 'ng-jsonapi/dist/models/collection.model';
import { IOrganizationInfo } from './models';

// ----------------------------------------------------------------------------
// --  Organizations List: get a summary list of organizations
// ----------------------------------------------------------------------------

export const ORGS_LIST_REQUEST = '[Organizations] List request';
export const ORGS_LIST_SUCCESS = '[Organizations] List success';
export const ORGS_LIST_FAILURE = '[Organizations] List failure';

export class OrganizationsListRequestAction implements Action {
  readonly type = ORGS_LIST_REQUEST;

  constructor(public payload: { force?: boolean }) {
  }
}

export class OrganizationsListSuccessAction implements Action {
  readonly type = ORGS_LIST_SUCCESS;

  constructor(public payload: DbOrganization[]) {
  }
}

export class OrganizationsListFailureAction implements Action {
  readonly type = ORGS_LIST_FAILURE;

  constructor(public payload: any) {
  }
}

// ----------------------------------------------------------------------------
// -- Organization Load: load full organization info from the API server
// ----------------------------------------------------------------------------

export const ORG_LOAD_SUCCESS = '[Organization] Load success';
export const ORG_LOAD_FAILURE = '[Organization] Load failure';

export class OrganizationLoadSuccessAction implements Action {
  readonly type = ORG_LOAD_SUCCESS;

  constructor(public payload: DbOrganization) {
  }
}

export class OrganizationLoadFailureAction implements Action {
  readonly type = ORG_LOAD_FAILURE;

  constructor(public payload: any) {
  }
}

// ----------------------------------------------------------------------------
// -- Organization Save: save updated orgnaization info on the API server
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// -- Organization Delete: organization will be deleted from the API server
// ----------------------------------------------------------------------------

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
  OrganizationsListRequestAction | OrganizationsListSuccessAction | OrganizationsListFailureAction |
  OrganizationLoadSuccessAction | OrganizationLoadFailureAction |
  OrganizationSaveRequestAction | OrganizationSaveSuccessAction | OrganizationSaveFailureAction |
  OrganizationDeleteRequestAction | OrganizationDeleteSuccessAction | OrganizationDeleteFailureAction;
