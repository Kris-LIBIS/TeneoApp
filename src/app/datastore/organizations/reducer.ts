import * as ud from 'updeep';
import * as _ from 'lodash';

import { ORGS_LOAD_FAILURE, ORGS_LOAD_REQUEST, ORGS_LOAD_SUCCESS, OrganizationsActions } from './actions';
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
  updating: boolean;
  lastUpdate: number;
}

export const INITIAL_ORGS_STATE: IOrganizationsState = {
  organizations: [],
  updating: false,
  lastUpdate: 0

};

function dbOrganization2organizationInfo(org: DbOrganization): IOrganizationInfo {
  const result = newOrganizationInfo();
  result.id = org.id;
  result.name = org.name;
  result.code = org.code;
  result.user_ids = org.user_ids;
  return result;
}

export function orgsReducer(state: IOrganizationsState = ud.freeze(INITIAL_ORGS_STATE), action: OrganizationsActions): IOrganizationsState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case ORGS_LOAD_REQUEST:
      if (action.payload || (!state.updating && (Date.now() - state.lastUpdate) > 600000)) {
        return updateState({updating: true});
      }
      return state;

    case ORGS_LOAD_SUCCESS:
      return updateState({
        organizations: action.payload.map(org => dbOrganization2organizationInfo(org)),
        updating: false,
        lastUpdate: Date.now()
      });

    case ORGS_LOAD_FAILURE:
      return updateState({updating: false});

    default:
      return state;
  }
}
