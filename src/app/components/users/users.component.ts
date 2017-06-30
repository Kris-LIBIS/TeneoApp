import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { IAppState, latestFrom } from '../../datastore/reducer';
import { IOrganizationInfo, IOrganizationsState } from '../../datastore/organizations/models';
import { dbUser2userInfo, IUserInfo, IUsersState, newUserInfo } from '../../datastore/users/models';
import {
  UserDeleteRequestAction, UserLoadFailureAction, UserLoadSuccessAction, UserSaveRequestAction, UsersListRequestAction
} from '../../datastore/users/actions';

import { UserEditDialogComponent } from './user-edit-dialog.component';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

import { IngesterApiService } from '../../services/ingester/ingester-api.service';
import { DbUser } from '../../services/ingester/models';
import { OrganizationsListRequestAction } from '../../datastore/organizations/actions';

@Component({
  selector: 'teneo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: Observable<IUserInfo[]>;
  lastUpdate: Observable<number>;
  organizations: Observable<IOrganizationInfo[]>;

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

  constructor(private _store: Store<IAppState>,
              private _api: IngesterApiService,
              public   dialog: MdDialog) {
    const state$: Observable<IUsersState> = this._store.select('users');
    this.users = state$.map(state => state.users);
    this.lastUpdate = state$.map(state => state.lastUpdate);
    this.organizations = this._store.select('organizations').map((state: IOrganizationsState) => state.organizations);
  }

  ngOnInit() {
    this._store.dispatch(new UsersListRequestAction({force: false}));
    this._store.dispatch(new OrganizationsListRequestAction({force: false}));
  }

  ngOnDestroy() {
  }

  reload() {
    this._store.dispatch(new UsersListRequestAction({force: true}));
  }

  deleteUser(user: IUserInfo) {
    this.confirmationDialog.data.title = `Deleting user '${user.name}'`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, this.confirmationDialog);
    dialogRef.afterClosed()
      .subscribe((result) => {
          if (result) {
            this._store.dispatch(new UserDeleteRequestAction(user));
          }
        },
        err => console.log(err)
      );
  }

  editUser(user) {
    this._api.getObject(DbUser, user.id)
      .subscribe((usr) => {
          this._store.dispatch(new UserLoadSuccessAction(usr));
          this.editDialog.data.user = dbUser2userInfo(usr);
          this.openEditDialog(this.editDialog);
        },
        (err) => this._store.dispatch(new UserLoadFailureAction({error: {type: 'Error', message: err.toString()}}))
      );
  }

  newUser() {
    this.editDialog.data.user = newUserInfo();
    this.openEditDialog(this.editDialog);
  }

  openEditDialog(dialogConfig: MdDialogConfig) {
    latestFrom(this.organizations)
      .subscribe(orgs => {
          dialogConfig.data.options = orgs;
          const dialogRef = this.dialog.open(UserEditDialogComponent, dialogConfig);
          dialogRef.afterClosed()
            .subscribe((data: IUserInfo) => {
                if (data) {
                  this._store.dispatch(new UserSaveRequestAction(data));
                }
              },
              err => console.log(err)
            );
        },
        err => console.log(err)
      );
  }
}
