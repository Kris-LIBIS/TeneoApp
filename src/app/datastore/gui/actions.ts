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

export const GUI_VALID_ROUTE = '[GUI] valid routing';

export class GuiValidRouteAction implements Action {
  readonly type = GUI_VALID_ROUTE;
}

export type GuiActions = GuiMessageAddAction | GuiMessageClearAction | GuiValidRouteAction;
