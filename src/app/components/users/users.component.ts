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
  lastUpdate: Observable<number>;

  organizations: Observable<IOrganizationInfo[]>;
  orgSubscription: Subscription;

  dialogSubscription: Subscription;

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

  pageInfo: Observable<IPageInfo>;

  constructor(private _store: Store<IAppState>,
              public   dialog: MdDialog) {
    const state$: Observable<IUsersState> = this._store.select('users');
    this.users = state$.map(state => state.users);
    this.lastUpdate = state$.map(state => state.lastUpdate);
    this.pageInfo = state$.map(state => state.page);
    this.lastUpdate = state$.map(state => state.lastUpdate);
    this.organizations = this._store.select('organizations').map((state: IOrganizationsState) => state.organizations);
  }

  ngOnInit() {
    this.orgSubscription = this.organizations.subscribe(orgs => this.editDialog.data.options = orgs);
    this._store.dispatch(new UsersLoadRequestAction({force: false, page: 1}));
    this._store.dispatch(new OrganizationsLoadRequestAction({force: false, page: 1, per_page: 50}));
  }

  ngOnDestroy() {
    this.orgSubscription.unsubscribe();
  }

  getMore(page: number) {
    this._store.dispatch(new UsersLoadRequestAction({force: true, page: page, more: true}));
  }

  reload() {
    this._store.dispatch(new UsersLoadRequestAction({force: true, page: 1}));
  }

  deleteUser(user: IUserInfo) {
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
