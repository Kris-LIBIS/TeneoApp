import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material'
import { IOrganizationInfo } from '../../datastore/organizations/models';
import * as _ from 'lodash';

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
      ingest_dir: [data.ingest_dir, Validators.required],
      producer: this._fb.group({
        id: data.producer.id,
        agent: data.producer.agent,
        password: data.producer.password
      }),
      material_flow: this._fb.array(
        _.toPairs(data.material_flow)
        .map(pair =>  this._fb.group({name: [pair[0]], id: [pair[1]]}))),
      user_ids: [data.users],
    });
  }

  addMaterialFlow() {
    (<FormArray>this.formGroup.controls.material_flow).push(this._fb.group({name: '', id: ''}));
  }

  removeMaterialFlow(i: number) {
    (<FormArray>this.formGroup.controls.material_flow).removeAt(i);

  }

}
