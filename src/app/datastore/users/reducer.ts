import * as ud from 'updeep';

import { USERS_LOAD_FAILURE, USERS_LOAD_REQUEST, USERS_LOAD_SUCCESS, UsersActions } from './actions';
import { DbUser } from '../../services/ingester/models';

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

function dbUser2userInfo(user: DbUser): IUserInfo {
  const result = newUserInfo();
  if (user.id) {
    result.id = user.id;
  }
  if (user.name) {
    result.name = user.name;
  }
  if (user.role) {
    result.role = user.role;
  }
  result.organization_ids = user.organization_ids.map(org_id => org_id);
  return result;
}

export function usersReducer(state: IUsersState = ud.freeze(INITIAL_USERS_STATE), action: UsersActions): IUsersState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case USERS_LOAD_REQUEST:
      if (state.updating) {
        return state;
      }
      if (!action.payload) {
        if (state.lastUpdate > 0 && (Date.now() - state.lastUpdate) < 60000) {
          return state;
        }
      }
      return updateState({updating: true});

    case USERS_LOAD_SUCCESS:
      return updateState({
        users: action.payload.map(user => dbUser2userInfo(user)),
        updating: false,
        lastUpdate: Date.now()
      });

    case USERS_LOAD_FAILURE:
      return updateState({updating: false});

    default:
      return state;
  }
}
