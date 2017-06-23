import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserInfo } from '../../datastore/users/models';

@Component({
  moduleId: module.id,
  selector: 'teneo-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user: IUserInfo;
  @Input() organizations: string;

  @Output() editUser: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() deleteUser: EventEmitter<IUserInfo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
