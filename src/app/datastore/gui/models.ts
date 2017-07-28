import { IUserInfo, newUserInfo } from '../users/models';
import { IOrganizationInfo, newOrganizationInfo } from '../organizations/models';

export interface IGuiMessage {
  severity: string;
  summary: string;
  detail: string;
}

export interface IGuiSelected {
  organization?: IOrganizationInfo;
}
export interface IGuiState {
  message: IGuiMessage;
  selected: IGuiSelected,
  selectOptions: any
}

export const INITIAL_GUI_STATE: IGuiState = {
  message: undefined,
  selected: {},
  selectOptions: {}
};
