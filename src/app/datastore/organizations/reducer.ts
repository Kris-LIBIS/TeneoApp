import * as ud from 'updeep';
import * as _ from 'lodash';
import { dbOrganization2organizationInfo, INITIAL_ORGS_STATE, IOrganizationsState, ORGS_LIST_FIELDS } from './models';

import {
  OrganizationsActions,
  ORGS_LIST_REQUEST, ORGS_LIST_SUCCESS, ORGS_LIST_FAILURE,
  ORG_LOAD_SUCCESS, ORG_SAVE_SUCCESS, ORG_DELETE_SUCCESS,
} from './actions';
import { replaceOrAppend } from '../reducer';

export function orgsReducer(state: IOrganizationsState = ud.freeze(INITIAL_ORGS_STATE), action: OrganizationsActions): IOrganizationsState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case ORGS_LIST_REQUEST:
      if (action.payload.force || (!state.updating && (Date.now() - state.lastUpdate) > 600000)) {
        return updateState({updating: true});
      }
      return state;

    case ORGS_LIST_SUCCESS:
      let orgList = action.payload.map(org => dbOrganization2organizationInfo(org));
      return updateState({
        organizations: orgList,
        updating: false,
        lastUpdate: Date.now()
      });

    case ORGS_LIST_FAILURE:
      return updateState({updating: false});

    case ORG_LOAD_SUCCESS:
    case ORG_SAVE_SUCCESS:
      return updateState({
        organizations: replaceOrAppend(state.organizations,
          _.pick(dbOrganization2organizationInfo(action.payload), ORGS_LIST_FIELDS.split(',')))
      });

    case ORG_DELETE_SUCCESS:
      return updateState({
        organizations: _.reject(state.organizations, (org) => org.id === action.payload.id)
      });

    default:
      return state;
  }
}
