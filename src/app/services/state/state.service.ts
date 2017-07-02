import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../datastore/reducer';
import { AuthorizationService, ITokenData } from '../authorization/authorization.service';
import { IUserInfo, newUserInfo } from '../../datastore/users/models';
import 'rxjs/add/operator/takeLast';
import { Observable } from 'rxjs/Observable';
import { IGuiMessage, IGuiState } from '../../datastore/gui/models';

@Injectable()
export class StateService {

  constructor(private _store: Store<IAppState>) {
  }

  get messages$(): Observable<IGuiMessage> {
    return this._store.select('gui')
      .map((guiState: IGuiState) => guiState.message);
  }

  get loggedIn$(): Observable<boolean> {
    return this._store
      .map(state => state.authorization.authorized);
  }

  loggedIn(): boolean {
    let result: boolean = false;
    Observable.from([1])
      .withLatestFrom(this.loggedIn$, (i, s) => s)
      .subscribe(s => result = s);
    return result;
  }

  getCurrentUser(): IUserInfo {
    let userInfo: IUserInfo = newUserInfo();
    Observable.from([1])
      .withLatestFrom(this._store)
      .map(([i, state]) => state)
      .map(state => state.authorization.jwtToken)
      .subscribe((token: string) => {
        if (token) {
          const tokenData: ITokenData = AuthorizationService.validate(token);
          userInfo = tokenData.user;
        }
      });
    // console.log('UserInfo: ', userInfo);
    return userInfo;
  }

  get currentUser$(): Observable<IUserInfo> {
    return this._store
      .map(state => state.authorization.jwtToken)
      .map(token => {
        // console.log('currentUser$ token:', token);
        if (token) {
          return AuthorizationService.validate(token).user;
        }
        return newUserInfo();
      })
  }

  get currentUserName$(): Observable<string> {
    return this.currentUser$.map(user => user ? user.name : '');
  }

}
