import * as ud from 'updeep';

import { GUI_MESSAGE_ADD, GUI_MESSAGE_CLEAR, GuiActions } from './actions';
import { AUTH_FAILURE, AUTH_SUCCESS, AuthActions } from '../authorization/actions';
import {
  USERS_LIST_FAILURE, USER_LOAD_FAILURE, USER_SAVE_FAILURE, USER_DELETE_FAILURE,
  UsersListFailureAction, UserLoadFailureAction, UserSaveFailureAction, UserDeleteFailureAction,
} from '../users/actions';
import {
  ORGS_LIST_FAILURE, ORG_LOAD_FAILURE, ORG_SAVE_FAILURE, ORG_DELETE_FAILURE,
  OrganizationsListFailureAction, OrganizationLoadFailureAction, OrganizationSaveFailureAction, OrganizationDeleteFailureAction,
} from '../organizations/actions';

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
  UsersListFailureAction | UserLoadFailureAction | UserSaveFailureAction | UserDeleteFailureAction |
  OrganizationsListFailureAction | OrganizationLoadFailureAction | OrganizationSaveFailureAction | OrganizationDeleteFailureAction;

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
    case USERS_LIST_FAILURE:
    case USER_LOAD_FAILURE:
    case USER_SAVE_FAILURE:
    case USER_DELETE_FAILURE:
    case ORGS_LIST_FAILURE:
    case ORG_LOAD_FAILURE:
    case ORG_SAVE_FAILURE:
    case ORG_DELETE_FAILURE: {
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
