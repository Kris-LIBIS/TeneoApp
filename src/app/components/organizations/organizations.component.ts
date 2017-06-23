import { Component, ContentChild, ContentChildren, OnDestroy, OnInit, Query, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { IAppState } from '../../datastore/reducer';
import { Store } from '@ngrx/store';
import { IOrganizationInfo, IOrganizationsState, newOrganizationInfo } from '../../datastore/organizations/models';
import { IUserInfo, IUsersState } from '../../datastore/users/models';
import { IPageInfo } from '../../datastore/models';
import {
  OrganizationDeleteRequestAction, OrganizationSaveRequestAction,
  OrganizationsLoadRequestAction
} from '../../datastore/organizations/actions';
import { UsersLoadRequestAction } from '../../datastore/users/actions';
import * as _ from 'lodash';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'teneo-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit, OnDestroy {

  organizations: Observable<IOrganizationInfo[]>;
  lastUpdate: Observable<number>;

  users: Observable<IUserInfo[]>;
  usersSubscription: Subscription;

  dialogSubscription: Subscription;

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

  pageInfo: Observable<IPageInfo>;

  @ViewChild('editdialog') editDialogTemplate: TemplateRef<any>;

  formGroup: FormGroup;

  constructor(private _store: Store<IAppState>,
              public   dialog: MdDialog,
              private _fb: FormBuilder) {
    const state$: Observable<IOrganizationsState> = this._store.select('organizations');
    this.organizations = state$.map(state => state.organizations);
    this.lastUpdate = state$.map(state => state.lastUpdate);
    this.pageInfo = state$.map(state => state.page);
    this.users = this._store.select('users').map((state: IUsersState) => state.users);
    this.lastUpdate = state$.map(state => state.lastUpdate);
    this.createForm(newOrganizationInfo());
  }

  ngOnInit() {
    this.usersSubscription = this.users.subscribe(users => this.editDialog.data.options = users);
    this._store.dispatch(new OrganizationsLoadRequestAction({force: false, page: 1}));
    this._store.dispatch(new UsersLoadRequestAction({force: false, page: 1, per_page: 50}));
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  getMore(page: number) {
    this._store.dispatch(new OrganizationsLoadRequestAction({force: true, page: page, more: true}));
  }

  reload() {
    this._store.dispatch(new OrganizationsLoadRequestAction({force: true, page: 1}));
  }

  orgUserList(org: IOrganizationInfo): Observable<string> {
    return this.users.map(users => org ? _.map(org.user_ids, (user_id) => {
        const user = _.find(users, user => user.id === user_id);
        return user ? user.name : '';
      }).join(',') : ''
    );
  }

  newOrganization() {
    this.formGroup.setValue(newOrganizationInfo());
    this.editDialog.data.organization = newOrganizationInfo();
    this.openEditDialog();
  }

  editOrganization(org) {
    this.formGroup.setValue(org);
    this.editDialog.data.organization = org;
    this.openEditDialog();
  }

  deleteOrganization(org: IOrganizationInfo) {
    this.confirmationDialog.data.title = `Deleting organization '$org.name}'`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, this.confirmationDialog);
    const subscription = dialogRef.afterClosed()
      .subscribe((result) => {
          if (result) {
            this._store.dispatch(new OrganizationDeleteRequestAction(org));
          }
          subscription.unsubscribe();
        }
      );
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(this.editDialogTemplate, this.editDialog);
    this.dialogSubscription = dialogRef.afterClosed()
      .subscribe((data: IOrganizationInfo) => {
          if (data) {
            this._store.dispatch(new OrganizationSaveRequestAction(data));
          }
          this.dialogSubscription.unsubscribe();
        }
      );
  }

  private createForm(data: IOrganizationInfo) {
    this.formGroup = this._fb.group({
      id: data.id,
      name: [data.name, Validators.required],
      code: [data.code, Validators.required],
      user_ids: [data.user_ids],
    });
  }

}
