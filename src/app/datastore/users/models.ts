import { DbUser } from '../../services/ingester/models';
import * as _ from "lodash";

export interface IUserInfo {
  id: string;
  name: string;
  role: string;
  password?: string;
  organizations?: string[];
  links?: any;
}

export const USERS_LIST_FIELDS = 'id,name,role,org';
export const USERS_SELECT_FIELDS = 'id,name,role,organizations';

export function newUserInfo(): IUserInfo {
  return {
    id: null,
    name: '',
    role: 'submitter'
  }
}

export function dbUser2userInfo(user: DbUser): IUserInfo {
  const result = newUserInfo();
  result.id = user.id;
  result.name = user.name;
  result.role = user.role;
  result.password = user.password;
  if (user.organizations) {
    result.organizations = user.organizations;
  }
  if (user.links) {
    result.links = {};
    _.forIn(user.links, (value, key) => result.links[key] = value._href);
  }
  return result;
}

export interface IUsersState {
  users: IUserInfo[];
  updating: boolean;
  lastUpdate: number;
}

export const INITIAL_USERS_STATE: IUsersState = {
  users: [],
  updating: false,
  lastUpdate: 0
};
