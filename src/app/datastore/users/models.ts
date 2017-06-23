import { DbUser } from '../../services/ingester/models';
import { IPageInfo, newPageInfo } from '../models';

export interface IUserInfo {
  id: string;
  name?: string;
  role?: string;
  organization_ids?: string[];
}

export function newUserInfo(): IUserInfo {
  return {
    id: null,
    name: '',
    role: 'submitter',
    organization_ids: []
  }
}

export function dbUser2userInfo(user: DbUser): IUserInfo {
  const result = newUserInfo();
  result.id = user.id;
  result.name = user.name;
  result.role = user.role;
  result.organization_ids = user.organization_ids;
  return result;
}

export interface IUsersState {
  users: IUserInfo[];
  updating: boolean;
  lastUpdate: number;
  page: IPageInfo;
}

export const INITIAL_USERS_STATE: IUsersState = {
  users: [],
  updating: false,
  lastUpdate: 0,
  page: newPageInfo()
};

