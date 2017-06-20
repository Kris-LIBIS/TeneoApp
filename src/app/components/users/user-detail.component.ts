import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserInfo, newUserInfo } from '../../datastore/users/reducer';

import * as _ from 'lodash';
import { IOrganizationInfo } from "../../datastore/organizations/reducer";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'teneo-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  protected readonly = true;
  protected userData: IUserInfo;
  // protected orgOptions: SelectItem[]
  // @Input() organizations: Observable<IOrganizationInfo[]>;

  @Input()
  set user(info) {
    if(info) {
      this.userForm.patchValue(info);
      this.userData = info;
    }
  }

  @Input() organizations: IOrganizationInfo[];

  @Output() userSaved: EventEmitter<IUserInfo> = new EventEmitter();

  userForm: FormGroup;
  // = new FormGroup({
  //   name: new FormControl(),
  //   role: new FormControl(),
  //   organzations: new FormControl()
  // });


  constructor(private _fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit() {
    // this.orgOptions = this.organizations.map(org => { return {label: org.name, value: org.id};});
    this.getValues();
  }

  // protected
  // get orgOptions: SelectItem[] {
  //   return this.organizations.map((org) => { return {label: org.name, value: org.id};});
  // }

  private createForm() {
    this.userForm = this._fb.group({
      id: '',
      name: ['' , Validators.required],
      role: ['' , Validators.required],
      organization_ids: [],
    });
    this.userForm.disable();
}

  private getValues() {
    if (this.userData) {
      this.userForm.patchValue(this.userData);
    }
  }

  private setValues() {
    console.log(this.userForm.getRawValue());
  }

  private setReadonly() {
    this.readonly = true;
    this.userForm.disable();
  }

  private unsetReadonly() {
    this.readonly = false;
    this.userForm.enable();
  }

  edit() {
    this.unsetReadonly();
    this.getValues();
  }

  submit() {
    this.setReadonly();
    this.setValues();
    this.userSaved.next(this.userData);
  }

  undo() {
    this.setReadonly();
    this.getValues();
  }

}
