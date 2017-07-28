import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { IAppState, latestFrom } from '../../datastore/reducer';
import { Store } from '@ngrx/store';
import {
  dbOrganization2organizationInfo, IOrganizationInfo, newOrganizationInfo
} from '../../datastore/organizations/models';
import { IUserInfo } from '../../datastore/users/models';
import {
  OrganizationDeleteRequestAction,
  OrganizationLoadFailureAction,
  OrganizationLoadSuccessAction,
  OrganizationSaveRequestAction,
  OrganizationsListRequestAction,
} from '../../datastore/organizations/actions';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';
import { OrganizationEditComponent } from './organization-edit.component';
import { UsersListRequestAction } from '../../datastore/users/actions';
import { IngesterApiService } from '../../services/ingester/ingester-api.service';
import { DbOrganization } from '../../services/ingester/models';
import * as _ from 'lodash';
import { go } from '@ngrx/router-store';
import { getSelectedUser } from '../../datastore/gui/selectors';
import { getUsers } from '../../datastore/users/selectors';
import { getOrganizations, getOrgLastUpdate } from '../../datastore/organizations/selectors';

@Component({
  selector: 'teneo-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit, OnDestroy {

  organizations: Observable<IOrganizationInfo[]>;
  lastUpdate: Observable<number>;
  users: Observable<IUserInfo[]>;

  filterText: Observable<string>;

  editDialog: MdDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    width: '',
    height: '',
    data: {
      organization: newOrganizationInfo(),
      options: []
    }
  };

  confirmationDialog: MdDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    data: {
      title: 'Deleting organization',
      message: 'Are you sure?',
      no: 'NO',
      yes: 'YES'
    }
  };

  constructor(private _store: Store<IAppState>,
              private _api: IngesterApiService,
              public   dialog: MdDialog) {
    this.organizations = this._store.select(getOrganizations);
    this.lastUpdate = this._store.select(getOrgLastUpdate);
    this.users = this._store.select(getUsers);
    this.filterText = this._store.select(getSelectedUser).map(user => user ? ' for ' + user.name : '');
  }

  ngOnInit() {
    this._store.dispatch(new OrganizationsListRequestAction({force: false}));
    this._store.dispatch(new UsersListRequestAction({force: false}));
  }

  ngOnDestroy() {
  }

  reload() {
    this._store.dispatch(new OrganizationsListRequestAction({force: true}));
  }

  deleteOrganization(org: IOrganizationInfo) {
    this.confirmationDialog.data.title = `Deleting organization '${org.name}'`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, this.confirmationDialog);
    dialogRef.afterClosed()
      .subscribe((result) => {
          if (result) {
            this._store.dispatch(new OrganizationDeleteRequestAction(org));
          }
        },
        err => console.log(err)
      );
  }

  editOrganization(organization) {
    this._api.getObject(DbOrganization, organization.id)
      .subscribe((org) => {
          this._store.dispatch(new OrganizationLoadSuccessAction(org));
          this.editDialog.data.organization = dbOrganization2organizationInfo(org);
          this.openEditDialog(this.editDialog);
        },
        (err) => this._store.dispatch(new OrganizationLoadFailureAction({
          error: {
            type: 'Error',
            message: err.toString()
          }
        }))
      );
  }

  newOrganization() {
    this.editDialog.data.organization = newOrganizationInfo();
    this.editDialog.data.organization.material_flow = {};
    this.editDialog.data.organization.producer = {};
    this.openEditDialog(this.editDialog);
  }

  openEditDialog(dialogConfig: MdDialogConfig) {
    latestFrom(this.users)
      .subscribe(users => {
          dialogConfig.data.options = users;
          const dialogRef = this.dialog.open(OrganizationEditComponent, dialogConfig);
          dialogRef.afterClosed()
            .subscribe((data) => {
                if (data) {
                  data.material_flow = _.fromPairs((data.material_flow).map(x => [x.name, x.id]));
                  this._store.dispatch(new OrganizationSaveRequestAction(data));
                }
              },
              err => console.log(err)
            );
        },
        err => console.log(err)
      );
  }

  openJobs(org: IOrganizationInfo) {
    this._store.dispatch(go('/jobs'));
  }

}
