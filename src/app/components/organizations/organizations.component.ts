import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { IAppState, latestFrom } from '../../datastore/reducer';
import { Store } from '@ngrx/store';
import {
  dbOrganization2organizationInfo, IOrganizationInfo, IOrganizationsState,
  newOrganizationInfo
} from '../../datastore/organizations/models';
import { IUserInfo, IUsersState } from '../../datastore/users/models';
import {
  OrganizationDeleteRequestAction, OrganizationLoadFailureAction, OrganizationLoadSuccessAction, OrganizationSaveRequestAction,
  OrganizationsListRequestAction,
} from '../../datastore/organizations/actions';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';
import { OrganizationEditComponent } from './organization-edit.component';
import { UsersListRequestAction } from '../../datastore/users/actions';
import { IngesterApiService } from '../../services/ingester/ingester-api.service';
import { DbOrganization } from '../../services/ingester/models';
import * as _ from 'lodash';
import { go } from '@ngrx/router-store';

@Component({
  selector: 'teneo-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit, OnDestroy {

  organizations: Observable<IOrganizationInfo[]>;
  lastUpdate: Observable<number>;
  users: Observable<IUserInfo[]>;

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
    const state$: Observable<IOrganizationsState> = this._store.select('organizations');
    this.organizations = state$.map(state => state.organizations);
    this.lastUpdate = state$.map(state => state.lastUpdate);
    this.users = this._store.select('users').map((state: IUsersState) => state.users);
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

  editOrganization(org) {
    this._api.getObject(DbOrganization, org.id)
      .subscribe((org) => {
          this._store.dispatch(new OrganizationLoadSuccessAction(org));
          this.editDialog.data.organization = dbOrganization2organizationInfo(org);
          this.openEditDialog(this.editDialog);
        },
        (err) => this._store.dispatch(new OrganizationLoadFailureAction({error: {type: 'Error', message: err.toString()}}))
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
