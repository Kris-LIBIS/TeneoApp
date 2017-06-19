import { routerReducer, RouterState } from '@ngrx/router-store';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment';
import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage';
import { authReducer, IAuthState, INITIAL_AUTH_STATE } from './authorization/reducer';
import { IGuiState, INITIAL_GUI_STATE, guiReducer } from './gui/reducer';
import { INITIAL_USERS_STATE, IUsersState, usersReducer } from './users/reducer';
import { INITIAL_ORGS_STATE, IOrganizationsState, orgsReducer } from './organizations/reducer';

export interface IAppState {
  router: RouterState;
  authorization: IAuthState;
  gui: IGuiState;
  users: IUsersState;
  organizations: IOrganizationsState;
}

const INITIAL_STATE: IAppState = {
  router: {
    path: '/login'
  },
  authorization: INITIAL_AUTH_STATE,
  gui: INITIAL_GUI_STATE,
  users: INITIAL_USERS_STATE,
  organizations: INITIAL_ORGS_STATE
};

const reducers = {
  router: routerReducer,
  authorization: authReducer,
  gui: guiReducer,
  users: usersReducer,
  organizations: orgsReducer
};

const localStorageConfig: LocalStorageConfig = {
  keys: ['router', 'authorization'],
  rehydrate: true,
  storage: localStorage,
  storageKeySerializer: (key) => `teneo_${key}`
};

//const devReducer: ActionReducer<IAppState> = compose(storeFreeze, localStorageSync(localStorageConfig), combineReducers)(reducers);
const devReducer: ActionReducer<IAppState> = compose(localStorageSync(localStorageConfig), combineReducers)(reducers);
const prdReducer: ActionReducer<IAppState> = compose(localStorageSync(localStorageConfig), combineReducers)(reducers);

export function reducer(state: IAppState = INITIAL_STATE, action: any) {
  if (environment.production) {
    return prdReducer(state, action);
  } else {
    return devReducer(state, action);
  }
}
