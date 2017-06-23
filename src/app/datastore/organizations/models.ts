import { DbOrganization } from '../../services/ingester/models';
import { IPageInfo, newPageInfo } from '../models';

export interface IProducerInfo {
  id: string,
  agent: string,
  password: string
}

export interface IOrganizationInfo {
  id: string;
  name?: string;
  code?: string;
  material_flow?: Object;
  ingest_dir?: string;
  producer?: IProducerInfo;
  user_ids?: string[];
}

export function newOrganizationInfo(): IOrganizationInfo {
  return {
    id: null,
    name: '',
    code: '',
    user_ids: []
  }
}

export interface IOrganizationsState {
  organizations: IOrganizationInfo[];
  updating: boolean;
  lastUpdate: number;
  page: IPageInfo;
}

export const INITIAL_ORGS_STATE: IOrganizationsState = {
  organizations: [],
  updating: false,
  lastUpdate: 0,
  page: newPageInfo()

};

export function dbOrganization2organizationInfo(org: DbOrganization): IOrganizationInfo {
  const result = newOrganizationInfo();
  result.id = org.id;
  result.name = org.name;
  result.code = org.code;
  result.user_ids = org.user_ids;
  return result;
}
