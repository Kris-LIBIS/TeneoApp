import * as ud from 'updeep';
import * as _ from 'lodash';
import { dbUser2userInfo, INITIAL_USERS_STATE, IUsersState, USERS_LIST_FIELDS } from './models';

import {
  UsersActions,
  USERS_LIST_REQUEST, USERS_LIST_SUCCESS, USERS_LIST_FAILURE,
  USER_LOAD_SUCCESS, USER_SAVE_SUCCESS, USER_DELETE_SUCCESS,
} from './actions';
import { replaceOrAppend } from '../reducer';

export function usersReducer(state: IUsersState = ud.freeze(INITIAL_USERS_STATE), action: UsersActions): IUsersState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case USERS_LIST_REQUEST:
      if (action.payload.force || (!state.updating && (Date.now() - state.lastUpdate) > 600000)) {
        return updateState({updating: true});
      }
      return state;

    case USERS_LIST_SUCCESS:
      let userList = action.payload.map(user => dbUser2userInfo(user));
      return updateState({
        users: userList,
        updating: false,
        lastUpdate: Date.now()
      });

    case USERS_LIST_FAILURE:
      return updateState({updating: false});

    case USER_SAVE_SUCCESS:
    case USER_LOAD_SUCCESS:
      return updateState({
        users: replaceOrAppend(state.users,
          _.pick(dbUser2userInfo(action.payload), USERS_LIST_FIELDS.split(',')))
      });

    case USER_DELETE_SUCCESS:
      return updateState({
        users: _.reject(state.users, user => user.id === action.payload.id)
      });

    default:
      return state;
  }
}
