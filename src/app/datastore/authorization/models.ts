export interface IAuthState {
  authorized: boolean;
  userName: string;
  jwtToken: string;
  updating: boolean;
}

export const INITIAL_AUTH_STATE: IAuthState = {
  authorized: false,
  userName: undefined,
  jwtToken: undefined,
  updating: false
};
