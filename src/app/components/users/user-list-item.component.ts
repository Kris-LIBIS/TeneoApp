import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2
} from '@angular/core';
import { IUserInfo } from '../../datastore/users/models';

@Component({
  moduleId: module.id,
  selector: 'teneo-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit, OnDestroy {

  @Input() user: IUserInfo;
  @Input() selectMode = true;

  @Output() editUser: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() deleteUser: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() selectedUser: EventEmitter<IUserInfo> = new EventEmitter();

  private removeListener: Function;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    if (this.selectMode) {
      this.removeListener = this.renderer.listen(this.elementRef.nativeElement,
        'click', (event) => {
          console.log('element clicked');
          this.onSelect(event);
        });
    }
  }

  ngOnDestroy() {
    if (this.removeListener) {
      this.removeListener();
    }
  }

  onDelete(event) {
    event.stopPropagation();
    this.deleteUser.next(this.user);
  }

  onEdit(event) {
    event.stopPropagation();
    this.editUser.next(this.user);
  }

  onSelect(event) {
    event.stopPropagation();
    this.selectedUser.next(this.user);
  }

}
