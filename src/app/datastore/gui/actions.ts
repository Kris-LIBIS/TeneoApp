import { Action } from '@ngrx/store';
import { IGuiMessage } from './models';
import { IUserInfo } from '../users/models';
import { IOrganizationInfo } from '../organizations/models';

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

export const GUI_SELECT_USER = '[GUI] select user';
export const GUI_FORGET_USER = '[GUI] forget user';

export class GuiSelectUserAction implements Action {
  readonly type = GUI_SELECT_USER;
  constructor(public payload: IUserInfo) {}
}

export class GuiForgetUserAction implements Action {
  readonly type = GUI_FORGET_USER;
}

export const GUI_SELECT_ORG_OPTIONS = '[GUI] select org options';

export class GuiSelectOrgOptions implements Action {
  readonly type = GUI_SELECT_ORG_OPTIONS;
  constructor(public payload: IOrganizationInfo[]) {}
}

export const GUI_SELECT_ORGANIZATION = '[GUI] select organization';

export class GuiSelectOrganizationAction implements Action {
  readonly type = GUI_SELECT_ORGANIZATION;
  constructor(public payload: IOrganizationInfo) {}
}

export type GuiActions = GuiMessageAddAction | GuiMessageClearAction | GuiValidRouteAction |
  GuiSelectUserAction | GuiForgetUserAction | GuiSelectOrgOptions | GuiSelectOrganizationAction;
