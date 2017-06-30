import { DbUser } from '../../services/ingester/models';

export interface IUserInfo {
  id: string;
  name: string;
  role: string;
  organization_ids?: string[];
}

export const USERS_LIST_FIELDS = 'id,name,role';

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
  if (user.organization_ids) {
    result.organization_ids = user.organization_ids;
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
