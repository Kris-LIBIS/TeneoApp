import * as ud from 'updeep';
import * as _ from 'lodash';
import { dbOrganization2organizationInfo, INITIAL_ORGS_STATE, IOrganizationInfo, IOrganizationsState } from './models';
import { DbOrganization } from '../../services/ingester/models';

import {
  ORGS_LOAD_REQUEST, ORGS_LOAD_SUCCESS, ORGS_LOAD_FAILURE,
  ORG_SAVE_SUCCESS, ORG_DELETE_SUCCESS, OrganizationsActions
} from './actions';
import { meta2PageInfo } from '../models';
import { replaceOrAppend } from '../reducer';

export function orgsReducer(state: IOrganizationsState = ud.freeze(INITIAL_ORGS_STATE), action: OrganizationsActions): IOrganizationsState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case ORGS_LOAD_REQUEST:
      if (action.payload.force || (!state.updating && (Date.now() - state.lastUpdate) > 600000)) {
        return updateState({updating: true});
      }
      return state;

    case ORGS_LOAD_SUCCESS:
      let orgsList = action.payload.collection.data.map(org => dbOrganization2organizationInfo(org));
      if (action.payload.append) {
        orgsList = _.concat(state.organizations, orgsList);
      }
      const info = action.payload.collection.meta;
      return updateState({
        organizations: orgsList,
        updating: false,
        lastUpdate: Date.now(),
        page: meta2PageInfo(info)
      });

    case ORG_SAVE_SUCCESS:
      return updateState({
        organizations: replaceOrAppend(state.organizations, dbOrganization2organizationInfo(action.payload))
      });

    case ORG_DELETE_SUCCESS:
      return updateState({
        organizations: _.reject(state.organizations, (org) => org.id === action.payload.id)
      });

    case ORGS_LOAD_FAILURE:
      return updateState({updating: false});

    default:
      return state;
  }
}
