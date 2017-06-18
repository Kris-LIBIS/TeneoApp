import { Action } from '@ngrx/store';
import { IGuiMessage } from './reducer';

export const GUI_MESSAGE_ADD = '[GUI] message add';
export const GUI_MESSAGE_CLEAR = '[GUI] message clear';

export class GuiMessageAddAction implements Action {
  readonly type = GUI_MESSAGE_ADD;

  constructor(public payload: IGuiMessage) {}
}

export class GuiMessageClearAction implements Action {
  readonly type = GUI_MESSAGE_CLEAR;
}
export type GuiActions = GuiMessageAddAction | GuiMessageClearAction;
