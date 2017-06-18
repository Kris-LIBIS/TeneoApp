import * as ud from 'updeep';
import * as _ from 'lodash';
import { ORGS_LOAD_FAILURE, ORGS_LOAD_REQUEST, ORGS_LOAD_SUCCESS, OrganizationsActions } from './actions';
import { IUserInfo } from '../users/reducer';

export interface IProducerInfo {
  id: string,
  agent: string,
  password: string
}

export interface IOrganizationInfo {
  id: string;
  name: string;
  code?: string;
  material_flow?: Object;
  ingest_dir?: string;
  producer?: IProducerInfo;
  users?: IUserInfo[];
}

export function newOrganizationInfo(): IOrganizationInfo {
  return {
    id: null,
    name: '',
    users: []
  }
}

export interface IOrganizationsState {
  organizations: IOrganizationInfo[];
  selected: IOrganizationInfo;
  updating: boolean;
}

export const INITIAL_ORGS_STATE: IOrganizationsState = {
  organizations: [],
  selected: newOrganizationInfo(),
  updating: false
};

export function orgsReducer(state: IOrganizationsState = ud.freeze(INITIAL_ORGS_STATE), action: OrganizationsActions): IOrganizationsState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case ORGS_LOAD_REQUEST:
      return updateState({updating: true});

    case ORGS_LOAD_SUCCESS:
      return updateState({
        organizations: action.payload.map(org => _.pick(org, ['id', 'name', 'code', 'material_flow', 'ingest_dir', 'producer', 'users'])),
        updating: false
      });

    case ORGS_LOAD_FAILURE:
      return updateState({updating: false});

    default:
      return state;
  }
}
