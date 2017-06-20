import { Action } from '@ngrx/store';

export const ORGS_LOAD_REQUEST = '[Organizations] Load request';
export const ORGS_LOAD_SUCCESS = '[Organizations] Load success';
export const ORGS_LOAD_FAILURE = '[Organizations] Load failure';

export class OrganizationsLoadRequestAction implements Action {
  readonly type = ORGS_LOAD_REQUEST;
  constructor(public payload: boolean = false) {}
}

export class OrganizationsLoadSuccessAction implements Action {
  readonly type = ORGS_LOAD_SUCCESS;
  constructor(public payload: any[]) {}
}

export class OrganizationsLoadFailureAction implements Action {
  readonly type = ORGS_LOAD_FAILURE;
  constructor(public payload: any) {}
}

export type OrganizationsActions = OrganizationsLoadRequestAction | OrganizationsLoadSuccessAction | OrganizationsLoadFailureAction;
