import { Attribute, JsonApiModel, JsonApiModelConfig } from 'ng-jsonapi';

@JsonApiModelConfig({
  type: 'users'
})
export class DbUser extends JsonApiModel {
  @Attribute()
  name: string;

  @Attribute()
  role: string;

  @Attribute()
  organizations: Array<{id: string, name: string}>;
}

@JsonApiModelConfig({
  type: 'organizations'
})
export class DbOrganization extends JsonApiModel {
  @Attribute()
  name: string;

  @Attribute()
  code: string;

  @Attribute()
  material_flow: Object;

  @Attribute()
  ingest_dir: string;

  @Attribute()
  producer: { id: string, agent: string, password: string }

  producerName() {
    return this.producer.agent;
  }

  @Attribute()
  created_at: Date;

  @Attribute()
  users: Array<any>;

}
