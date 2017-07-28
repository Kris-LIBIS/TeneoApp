import { IAppState } from '../reducer';
import { getSelectedUser } from '../gui/selectors';
import * as _ from 'lodash';

//noinspection JSUnusedGlobalSymbols
export const getOrgState = (state: IAppState) => state.organizations;

//noinspection JSUnusedGlobalSymbols
export const getOrganizations = (state: IAppState) => state.organizations.organizations;

export const getFilteredOrganizations = (state: IAppState) => {
  const user = getSelectedUser(state);
  let result = getOrganizations(state);
  if (user) {
    result = _.remove(result, org => org.users.indexOf(user.id) < 0);
  }
  return result;
};

//noinspection JSUnusedGlobalSymbols
export const getOrgLastUpdate = (state: IAppState) => state.organizations.lastUpdate;
