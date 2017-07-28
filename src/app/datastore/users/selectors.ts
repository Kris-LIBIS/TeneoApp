import { IAppState } from '../reducer';

//noinspection JSUnusedGlobalSymbols
export const getUserState = (state: IAppState) => state.users;

//noinspection JSUnusedGlobalSymbols
export const getUsers = (state: IAppState) => state.users.users;

//noinspection JSUnusedGlobalSymbols
export const getUserLastUpdate = (state: IAppState) => state.users.lastUpdate;
