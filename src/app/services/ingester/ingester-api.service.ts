import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AttributeMetadata, JsonApiDatastore, JsonApiDatastoreConfig, JsonApiModel, ModelType } from 'ng-jsonapi';
import { environment } from '../../../environments/environment';
import { DbOrganization, DbUser } from './models';
import { Observable } from 'rxjs/Observable';
import { CollectionModel } from 'ng-jsonapi/dist/models/collection.model';


@Injectable()
@JsonApiDatastoreConfig({
  models: {
    users: DbUser,
    organizations: DbOrganization
  }
})
export class IngesterApiService extends JsonApiDatastore {

  constructor(protected http: Http) {
    super(http);
    const headers = new Headers();
    headers.append('Accept', 'application/vnd.api+json');
    headers.append('Content-Type', 'application/json');
    this.headers = headers;
    this.setBaseUrl(environment.urlApiBase);
  }

  getObjectList<T extends JsonApiModel>(modelType: ModelType<T>, options?: any): Observable<T[]> {
    if (!options) {
      options = {}
    }
    return this.query(modelType, options).map((collection) => collection.data);
  }

  getCollection<T extends JsonApiModel>(modelType: ModelType<T>, page?: number, per_page?: number, options?: any): Observable<CollectionModel<T>> {
    const opts = options ? options : {};
    if (page) {
      opts.page = page
    }
    if (per_page) {
      opts.per_page = per_page
    }
    if (opts) {
      return this.query(modelType, opts);
    }
    return this.query(modelType);
  }

  getObject<T extends JsonApiModel>(modelType: ModelType<T>, id: string): Observable<T> {
    return this.findRecord(modelType, id).map((document) => document.data);
  }

  saveObject<T extends JsonApiModel>(modelType: ModelType<T>, data: any) {
    const obj = new modelType({attributes: data});
    const attributesMetadata: any = obj[AttributeMetadata];
    return this.saveRecord(attributesMetadata, obj).map((document) => document.data);
  }

  deleteObject<T extends JsonApiModel>(modelType: ModelType<T>, data: any): Observable<boolean> {
    return this.deleteRecord(modelType, data.id).map((res) => res == null);
  }

  getHasMany<T extends JsonApiModel>(modelType: ModelType<T>, url: string): Observable<T[]> {
    return this.hasManyLink(modelType, url).map((collection) => collection.data);
  }

  getBelongsTo<T extends JsonApiModel>(modelType: ModelType<T>, url: string): Observable<T> {
    return this.belongsToLink(modelType, url).map((document) => document.data);
  }

}
