import * as ud from 'updeep';
import * as _ from 'lodash';
import { meta2PageInfo } from '../models';
import { dbUser2userInfo, INITIAL_USERS_STATE, IUserInfo, IUsersState } from './models';

import {
  USERS_LOAD_REQUEST, USERS_LOAD_SUCCESS, USERS_LOAD_FAILURE,
  USERS_SAVE_SUCCESS, USERS_DELETE_SUCCESS, UsersActions
} from './actions';

export function usersReducer(state: IUsersState = ud.freeze(INITIAL_USERS_STATE), action: UsersActions): IUsersState {
  const updateState = ud(ud._, state);
  switch (action.type) {

    case USERS_LOAD_REQUEST:
      if (action.payload.force || (!state.updating && (Date.now() - state.lastUpdate) > 600000)) {
        return updateState({updating: true});
      }
      return state;

    case USERS_LOAD_SUCCESS:
      let userList = action.payload.collection.data.map(user => dbUser2userInfo(user));
      if (action.payload.append) {
        userList = _.concat(state.users, userList);
      }
      const info = action.payload.collection.meta;
      return updateState({
        users: userList,
        updating: false,
        lastUpdate: Date.now(),
        page: meta2PageInfo(info)
      });

    case USERS_SAVE_SUCCESS:
      const newUser: IUserInfo = dbUser2userInfo(action.payload);
      return updateState({
        users: state.users.map(user => user.id === newUser.id ? newUser : user)
      });

    case USERS_DELETE_SUCCESS:
      return updateState({
        users: _.reject(state.users, (user) => user.id === action.payload.id)
      });

    case USERS_LOAD_FAILURE:
      return updateState({updating: false});

    default:
      return state;
  }
}
