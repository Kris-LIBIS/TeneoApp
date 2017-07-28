import { IAppState } from '../reducer';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { IUserInfo } from '../users/models';
import { IOrganizationInfo } from '../organizations/models';

//noinspection JSUnusedGlobalSymbols
export const getGuiState = (state: IAppState) => state.gui;

//noinspection JSUnusedGlobalSymbols
export const getMessage = (state: IAppState) => state.gui.message;

//noinspection JSUnusedGlobalSymbols
export const getSelectedUser = (state: IAppState): IUserInfo => {
  const auth = state.authorization;
  if (auth.jwtToken) {
    const data = AuthorizationService.validate(auth.jwtToken);
    if (data.user && data.user.role === 'submitter') {
      return data.user;
    }
  }
  return null;
};

//noinspection JSUnusedGlobalSymbols
export const getSelectedOrganization = (state: IAppState): IOrganizationInfo => {
  const user = getSelectedUser(state);
  if (state.gui.selected.organization) {
    return state.gui.selected.organization;
  }
  if (user) {
    const orgs: Array<IOrganizationInfo> = [];
    state.organizations.organizations
      .forEach(org => org.users.some(id => id === user.id) ? orgs.push(org) : null);
    if (orgs.length === 1) {
      return orgs[0];
    }
  }
  return null;
};

//noinspection JSUnusedGlobalSymbols
export const getBreadcrumbModel = (state: IAppState) => {
  const result = [];
  const selected = state.gui.selected;
  const user = getSelectedUser(state);
  if (!user) {
    return result;
  }

  result.push({
    label: user.name,
    icon: 'fa-user',
    routerLink: ['/organizations'],
    disabled: user.role === 'submitter'
  });

  const org = getSelectedOrganization(state);
  if (!org) {
    return result;
  }

  result.push({
    label: org.name,
    icon: 'fa-group',
    routerLink: ['/jobs'],
    disabled: user.organizations && user.organizations.length === 1
  });

  return result;
};
