import { DbOrganization } from '../../services/ingester/models';

export interface IProducerInfo {
  id: string,
  agent: string,
  password: string
}

export interface IOrganizationInfo {
  id: string;
  name: string;
  code: string;
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
  }
}

export const ORGS_LIST_FIELDS = 'id,name,code';

export interface IOrganizationsState {
  organizations: IOrganizationInfo[];
  updating: boolean;
  lastUpdate: number;
}

export const INITIAL_ORGS_STATE: IOrganizationsState = {
  organizations: [],
  updating: false,
  lastUpdate: 0,
};

export function dbOrganization2organizationInfo(org: DbOrganization): IOrganizationInfo {
  const result = newOrganizationInfo();
  result.id = org.id;
  result.name = org.name;
  result.code = org.code;
  if (org.material_flow) {
    result.material_flow = org.material_flow;
  }
  if (org.ingest_dir) {
    result.ingest_dir = org.ingest_dir;
  }
  if (org.producer) {
    result.producer = {id: '', agent: '', password: ''};
    result.producer.id = org.producer.id;
    result.producer.agent = org.producer.agent;
    result.producer.password = org.producer.password;
  }
  if (org.user_ids) {
    result.user_ids = org.user_ids;
  }
  return result;
}
