import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrganizationInfo } from '../../datastore/organizations/models';

@Component({
  moduleId: module.id,
  selector: 'teneo-organization-list-item',
  templateUrl: './organization-list-item.component.html',
  styleUrls: ['./organization-list-item.component.scss']
})
export class OrganizationListItemComponent implements OnInit {

  @Input() organization: IOrganizationInfo;

  @Output() editOrganization: EventEmitter<IOrganizationInfo> = new EventEmitter();
  @Output() deleteOrganization: EventEmitter<IOrganizationInfo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
