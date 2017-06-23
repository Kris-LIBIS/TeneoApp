import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { IAppState } from '../../datastore/reducer';
import { IPageInfo } from '../../datastore/models';
import { IOrganizationInfo, IOrganizationsState } from '../../datastore/organizations/models';
import { IUserInfo, IUsersState, newUserInfo } from '../../datastore/users/models';
import { UsersDeleteRequestAction, UsersLoadRequestAction, UsersSaveRequestAction } from '../../datastore/users/actions';
import { OrganizationsLoadRequestAction } from '../../datastore/organizations/actions';

import { UserEditDialogComponent } from './user-edit-dialog.component';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

import * as _ from 'lodash';

@Component({
  selector: 'teneo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: Observable<IUserInfo[]>;
  organizations: Observable<IOrganizationInfo[]>;
  orgSubscription: Subscription;
  dialogSubscription: Subscription;
  lastUpdate: Observable<number>;

  editDialog: MdDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    width: '',
    height: '',
    data: {
      user: newUserInfo(),
      options: []
    }
  };

  confirmationDialog: MdDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    data: {
      title: 'Deleting user',
      message: 'Are you sure?',
      no: 'NO',
      yes: 'YES'
    }
  };

  pageInfo: IPageInfo;
  hasMore: boolean;
  pageInfoSubscription: Subscription;

  constructor(private _store: Store<IAppState>,
              public   dialog: MdDialog) {
    this.users = this._store.select('users').map((state: IUsersState) => state.users);
    this.lastUpdate = this._store.select('users').map((state: IUsersState) => state.lastUpdate);
  }

  ngOnInit() {
    this.organizations = this._store.select('organizations')
      .map((state: IOrganizationsState) => state.organizations);
    this.orgSubscription = this.organizations
      .subscribe((orgs) => this.editDialog.data.options = orgs);
    this._store.dispatch(new UsersLoadRequestAction({force: false, page: 1}));
    this._store.dispatch(new OrganizationsLoadRequestAction({force: false, page: 1, per_page: 50}));
    this.pageInfoSubscription = this._store.select('users').map((state: IUsersState) => state.page).subscribe(info => {
      this.pageInfo = info;
      this.hasMore = info.current < info.pages;
    });
  }

  ngOnDestroy() {
    this.orgSubscription.unsubscribe();
    this.pageInfoSubscription.unsubscribe();
  }

  remainingCount(): number {
    return this.pageInfo.count - this.pageInfo.current * this.pageInfo.per_page;
  }

  getMore() {
    this._store.dispatch(new UsersLoadRequestAction({force: true, page: this.pageInfo.current + 1, more: this.pageInfo.current > 0}));
  }

  refresh() {
    this._store.dispatch(new UsersLoadRequestAction({force: true, page: 1}));
  }

  userOrgList(user: IUserInfo): Observable<string> {
    return this.organizations.map(orgs => _.map(user.organization_ids, (id) => {
        const org = _.find(orgs, org => org.id === id);
        return org ? org.name : '';
      }).join(',')
    );
  }

  userDeleted(user: IUserInfo) {
    this.confirmationDialog.data.title = `Deleting user '${user.name}'`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, this.confirmationDialog);
    const subscription = dialogRef.afterClosed()
      .subscribe((result) => {
          if (result) {
            this._store.dispatch(new UsersDeleteRequestAction(user));
          }
          subscription.unsubscribe();
        }
      );
  }

  editUser(user) {
    this.editDialog.data.user = user;
    this.openEditDialog();
  }

  newUser() {
    this.editDialog.data.user = newUserInfo();
    this.openEditDialog();
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(UserEditDialogComponent, this.editDialog);
    this.dialogSubscription = dialogRef.afterClosed()
      .subscribe((data: IUserInfo) => {
          if (data) {
            // if (!data.organization_ids) {
            //   data.organization_ids = [];
            // }
            this._store.dispatch(new UsersSaveRequestAction(data));
          }
          this.dialogSubscription.unsubscribe();
        }
      );
  }

}
