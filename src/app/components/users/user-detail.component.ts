import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserInfo, newUserInfo } from '../../datastore/users/reducer';

import * as _ from 'lodash';
import { IOrganizationInfo } from "../../datastore/organizations/reducer";

@Component({
  moduleId: module.id,
  selector: 'teneo-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  protected readonly = true;
  protected values: IUserInfo;

  @Input() user: IUserInfo;
  @Input() organizations: IOrganizationInfo[];
  @Output() userSaved: EventEmitter<IUserInfo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.getValues();
  }

  private getValues() {
    if (this.user) {
      this.values = newUserInfo();
      _.assign(this.values, this.user);
    }
  }

  private setValues() {
    if (!this.user) {
      this.user = newUserInfo();
    }
    _.assign(this.user, this.values);
  }

  edit() {
    this.readonly = false;
    this.getValues();
  }

  submit() {
    this.readonly = true;
    this.setValues();
    this.userSaved.next(this.user);
  }

  undo() {
    this.readonly = true;
    this.getValues();
  }

}
