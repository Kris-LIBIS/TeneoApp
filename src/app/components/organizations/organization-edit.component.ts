import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material'
import { IOrganizationInfo } from '../../datastore/organizations/models';

@Component({
  moduleId: module.id,
  selector: 'teneo-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private _fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.createForm(this.data.organization);

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
