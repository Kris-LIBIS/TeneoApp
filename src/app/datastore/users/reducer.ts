import * as ud from 'updeep';
import * as _ from 'lodash';
import { USERS_LOAD_FAILURE, USERS_LOAD_REQUEST, USERS_LOAD_SUCCESS, UsersActions } from './actions';
import { IOrganizationInfo } from '../organizations/reducer';

export interface IUserInfo {
  id: string;
  name: string;
  role?: string;
  organizations?: IOrganizationInfo[];
}

export function newUserInfo(): IUserInfo {
  return {
    id: null,
    name: '',
    role: 'submitter',
    organizations: []
  }
}

export interface IUsersState {
  users: IUserInfo[];
  selected: IUserInfo;
  updating: boolean;
}

export const INITIAL_USERS_STATE: IUsersState = {
  users: [],
  selected: newUserInfo(),
  updating: false
};

export function usersReducer(state: IUsersState = ud.freeze(INITIAL_USERS_STATE), action: UsersActions): IUsersState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case USERS_LOAD_REQUEST:
      return updateState({updating: true});

    case USERS_LOAD_SUCCESS:
      return updateState({
        users: action.payload.map(user => _.pick(user, ['id', 'name', 'role', 'organizations'])),
        updating: false
      });

    case USERS_LOAD_FAILURE:
      return updateState({updating: false});

    default:
      return state;
  }
}
