import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { IUserInfo } from '../../datastore/users/models';

@Component({
  selector: 'teneo-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  userForm: FormGroup;

  constructor(private _fb: FormBuilder,
              public dialogRef: MdDialogRef<UserEditDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
    this.createForm(data.user);
  }

  ngOnInit() {
  }

  private createForm(data: IUserInfo) {
    this.userForm = this._fb.group({
      id: data.id,
      name: [data.name, Validators.required],
      role: [data.role, Validators.required],
      password: [data.password],
      organizations: [data.organizations],
    });
  }

  saveData() {
    this.dialogRef.close(this.userForm.value);
  }

  undoData() {
    this.dialogRef.close();
  }

}
