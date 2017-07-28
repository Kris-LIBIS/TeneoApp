import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentValue, IAppState } from '../../datastore/reducer';
import { AuthorizationService } from '../authorization/authorization.service';
import { IUserInfo, newUserInfo } from '../../datastore/users/models';
import 'rxjs/add/operator/takeLast';
import { Observable } from 'rxjs/Observable';
import { IGuiMessage } from '../../datastore/gui/models';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class StateService {

  public messages$: Observable<IGuiMessage>;
  public loggedIn$: Observable<boolean>;
  public jwtToken$: Observable<string>;
  public currentUser$: Observable<IUserInfo>;
  public currentUserName$: Observable<string>;

  public loggedIn = false;
  public jwtToken: string;
  public currentUser: IUserInfo;

  private loggedInSubscription: Subscription;
  private jwtTokenSubscription: Subscription;
  private currentUserSubscription: Subscription;

  constructor(private _store: Store<IAppState>) {
    this.messages$ = this._store.select('gui', 'message');
    this.loggedIn$ = this._store.map(state => state.authorization.authorized);
    this.jwtToken$ = this._store.map(state => state.authorization.jwtToken);
    this.currentUser$ = this.jwtToken$.map((token: string) =>
      token ? AuthorizationService.validate(token).user : newUserInfo());
    this.currentUserName$ = this.currentUser$.map((user: IUserInfo) => user.name);

    this.loggedIn = getCurrentValue(this.loggedIn$);
    this.jwtToken = getCurrentValue(this.jwtToken$);
    this.currentUser = getCurrentValue(this.currentUser$);

    this.loggedInSubscription = this.loggedIn$.subscribe(
      (v: boolean) => this.loggedIn = v,
      (err) => console.log('Error getting value from loggedIn stream'),
      () => this.loggedInSubscription ? this.loggedInSubscription.unsubscribe() : null
    );
    this.jwtTokenSubscription = this.jwtToken$.subscribe(
      (token: string) => this.jwtToken = token,
      (err) => console.log('Error getting value from jwtToken stream'),
      () => this.jwtTokenSubscription ? this.jwtTokenSubscription.unsubscribe() : null
    );
    this.currentUserSubscription = this.currentUser$.subscribe(
      (user: IUserInfo) => this.currentUser = user,
      (err) => console.log('Error getting value from currentUser stream'),
      () => this.currentUserSubscription ? this.currentUserSubscription.unsubscribe() : null
    );
  }

}
