import { GUI_MESSAGE_ADD, GUI_MESSAGE_CLEAR, GUI_MESSAGE_DELETE, GuiActions } from './actions';

import * as ud from 'updeep';
import { AUTH_FAILURE, AUTH_SUCCESS, AuthActions, AuthFailureAction } from '../authorization/actions';
import { UUID } from 'angular2-uuid';

export interface IGuiMessage {
  id: string;
  severity: string;
  summary: string;
  detail: string;
}

export interface IGuiState {
  messages: IGuiMessage[];
}

export const INITIAL_GUI_STATE: IGuiState = {
  messages: []
};

function addMessage(state: IGuiState, message: IGuiMessage): IGuiState {
  return ud({messages: state.messages.slice(-5).concat([message])}, state);
}

export function guiReducer(state: IGuiState = INITIAL_GUI_STATE, action: GuiActions | AuthActions) {
  const updateState = ud(ud._, state);
  switch (action.type) {
    case GUI_MESSAGE_ADD: {
      const message: IGuiMessage = action.payload;
      if (!message.id) {
        message.id = UUID.UUID();
      }
      return addMessage(state, action.payload);
    }

    case GUI_MESSAGE_DELETE: {
      const i = state.messages.findIndex((msg: IGuiMessage) => msg.id === action.payload.id);
      return updateState({messages: state.messages.slice(0, i).concat(state.messages.slice(i + 1))});
    }

    case GUI_MESSAGE_CLEAR: {
      return updateState({messages: []});
    }

    case AUTH_SUCCESS: {
      return updateState({messages: [{
        id: UUID.UUID(),
        severity: 'success',
        summary: 'Logged in',
        detail: `You are currently logged in as ${action.payload.user.name}.`
      }]})
    }

    case AUTH_FAILURE: {
      return addMessage(state, {
        id: UUID.UUID(),
        severity: 'error',
        summary: action.payload.error.type,
        detail: action.payload.error.message
      });
    }

    default:
      return state;
  }
}
