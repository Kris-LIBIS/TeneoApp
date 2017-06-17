import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';

export interface IAuthorizationRequest {
  user: string;
  password: string;
}

export interface ITokenData {
  token?: string;
  user?: {
    id: string;
    name: string;
    role: string;
  };
  error?: {
    type: string;
    message: string;
  }
}

@Injectable()
export class AuthorizationService {

  constructor(private _http: Http) {
  }

  authenticate(request: IAuthorizationRequest): Observable<ITokenData> {
    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return this._http
      .post(environment.urlAuth, {name: request.user, password: request.password}, {headers: headers})
      .map((res) => AuthorizationService.handle_reply(res));
  }

  refresh(token: string): Observable<ITokenData> {
    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return this._http
      .patch(environment.urlAuth, {token: token}, {headers: headers})
      .map((res) => AuthorizationService.handle_reply(res));
  }

  static handle_reply(res): ITokenData {
    console.log('Reply: ', res);
    const data = res.json();
    if (!res.ok) {
      return {error: {type: res.statusText, message: data.error}};
    }
    return AuthorizationService.validate(data.message);

  }

  static validate(token: string): ITokenData {
    try {
      const data = jwt_decode(token);
      console.log('Token decoded', data);
      return {token: token, user: data.user};
    } catch (err) {
      console.log('DecodeError', err.toString());
      return {error: {type: 'JwtDecodeError', message: err.toString()}};
    }
  }

}
