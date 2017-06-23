import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrganizationInfo } from '../../datastore/organizations/models';

@Component({
  moduleId: module.id,
  selector: 'teneo-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {

  @Input() organization: IOrganizationInfo;
  @Input() users: string;

  @Output() editOrganization: EventEmitter<IOrganizationInfo> = new EventEmitter();
  @Output() deleteOrganization: EventEmitter<IOrganizationInfo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
