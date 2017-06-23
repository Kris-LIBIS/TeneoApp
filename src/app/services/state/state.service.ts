import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../datastore/reducer';
import { AuthorizationService, ITokenData } from '../authorization/authorization.service';
import { IUserInfo } from '../../datastore/users/models';

@Injectable()
export class StateService {

  constructor(private _store: Store<IAppState>) {
  }

  getCurrentUser(): IUserInfo | null {
    let userInfo: IUserInfo = null;
    this._store.take(1)
      .map(state => state.authorization.jwtToken)
      .subscribe((token: string) => {
        if (token) {
          const tokenData: ITokenData = AuthorizationService.validate(token);
          userInfo = tokenData.user;
        }
      });
    return userInfo;
  }

}
