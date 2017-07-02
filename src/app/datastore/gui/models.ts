import { IUserInfo, newUserInfo } from '../users/models';
import { IOrganizationInfo, newOrganizationInfo } from '../organizations/models';

export interface IGuiMessage {
  severity: string;
  summary: string;
  detail: string;
}

export interface IGuiState {
  message: IGuiMessage;
  breadcrumbs: {
    user: IUserInfo,
    organization: IOrganizationInfo,
  }
}

export const INITIAL_GUI_STATE: IGuiState = {
  message: undefined,
  breadcrumbs: {
    user: undefined,
    organization: undefined,
  }
};

