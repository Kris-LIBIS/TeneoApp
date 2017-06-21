import * as ud from 'updeep';

import { GUI_MESSAGE_ADD, GUI_MESSAGE_CLEAR, GuiActions } from './actions';
import { AUTH_FAILURE, AUTH_SUCCESS, AuthActions } from '../authorization/actions';
import {
  USERS_ADD_FAILURE,
  USERS_LOAD_FAILURE, USERS_SAVE_FAILURE, UsersAddFailureAction, UsersLoadFailureAction,
  UsersSaveFailureAction
} from '../users/actions';
import { OrganizationsLoadFailureAction, ORGS_LOAD_FAILURE } from '../organizations/actions';

export interface IGuiMessage {
  severity: string;
  summary: string;
  detail: string;
}

export interface IGuiState {
  message: IGuiMessage;
}

export const INITIAL_GUI_STATE: IGuiState = {
  message: undefined
};

type GuiReducerActions =
  GuiActions | AuthActions |
  UsersLoadFailureAction | UsersSaveFailureAction | UsersAddFailureAction |
  OrganizationsLoadFailureAction;

export function guiReducer(state: IGuiState = INITIAL_GUI_STATE, action: GuiReducerActions) {
  const updateState = ud(ud._, state);
  switch (action.type) {
    case GUI_MESSAGE_ADD: {
      const message: IGuiMessage = action.payload;
      return updateState({message: message});
    }

    case GUI_MESSAGE_CLEAR: {
      return updateState({message: undefined});
    }

    case AUTH_SUCCESS: {
      return updateState({
        message: {
          severity: 'success',
          summary: 'Logged in',
          detail: `You are currently logged in as ${action.payload.user.name}.`
        }
      });
    }

    case AUTH_FAILURE:
    case USERS_LOAD_FAILURE:
    case USERS_SAVE_FAILURE:
    case USERS_ADD_FAILURE:
    case ORGS_LOAD_FAILURE: {
      return updateState({
        message: {
          severity: 'error',
          summary: action.payload.error.type,
          detail: action.payload.error.message
        }
      });
    }

    default:
      return state;
  }
}
