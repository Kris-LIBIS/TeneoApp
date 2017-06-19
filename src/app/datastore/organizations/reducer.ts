import * as ud from 'updeep';
import * as _ from 'lodash';
import { ORGS_LOAD_FAILURE, ORGS_LOAD_REQUEST, ORGS_LOAD_SUCCESS, OrganizationsActions } from './actions';
import { IUserInfo } from '../users/reducer';
import { DbOrganization } from '../../services/ingester/models';

export interface IProducerInfo {
  id: string,
  agent: string,
  password: string
}

export interface IOrganizationInfo {
  id: string;
  name?: string;
  code?: string;
  material_flow?: Object;
  ingest_dir?: string;
  producer?: IProducerInfo;
  user_ids?: string[];
}

export function newOrganizationInfo(): IOrganizationInfo {
  return {
    id: null,
    name: '',
    user_ids: []
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

function dbOrganization2organizationInfo(org: DbOrganization): IOrganizationInfo {
  const result = newOrganizationInfo();
  if (org.id) {
    result.id = org.id;
  }
  if (org.name) {
    result.name = org.name;
  }
  if (org.code) {
    result.code = org.code;
  }
  result.user_ids = org.user_ids.map(user_id => user_id);
  return result;
}

export function orgsReducer(state: IOrganizationsState = ud.freeze(INITIAL_ORGS_STATE), action: OrganizationsActions): IOrganizationsState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case ORGS_LOAD_REQUEST:
      return updateState({updating: true});

    case ORGS_LOAD_SUCCESS:
      return updateState({
        organizations: action.payload.map(org => dbOrganization2organizationInfo(org)),
        updating: false
      });

    case ORGS_LOAD_FAILURE:
      return updateState({updating: false});

    default:
      return state;
  }
}
