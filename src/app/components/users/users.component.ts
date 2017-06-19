import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../datastore/reducer';
import { UsersLoadRequestAction } from '../../datastore/users/actions';
import { Observable } from 'rxjs/Observable';
import { IUserInfo, IUsersState } from '../../datastore/users/reducer';
import { IOrganizationInfo, IOrganizationsState } from '../../datastore/organizations/reducer';
import { OrganizationsLoadRequestAction } from '../../datastore/organizations/actions';

@Component({
  selector: 'teneo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Observable<IUserInfo[]>;
  organizations: Observable<IOrganizationInfo[]>;
  lastUpdate: Observable<number>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit() {
    this._store.dispatch(new UsersLoadRequestAction());
    this._store.dispatch(new OrganizationsLoadRequestAction());
    this.users = this._store.select('users').map((state: IUsersState) => state.users);
    this.lastUpdate = this._store.select('users').map((state: IUsersState) => state.lastUpdate);
    this.organizations = this._store.select('organizations').map((state: IOrganizationsState) => state.organizations);
  }

  refresh() {
    this._store.dispatch(new UsersLoadRequestAction(true));
  }

  userSaved(user: IUserInfo) {
    if (user.id) {
      // update user in store
      // this._store.dispatch(new UserUpdateAction(user));
    } else {
      // add user to store
      // this._store.dispatch(new UserAddAction(user));
    }
  }

  userDeleted(user: IUserInfo) {
    // this._store.dispatch(new UserDeleteAction(user));
  }


}
