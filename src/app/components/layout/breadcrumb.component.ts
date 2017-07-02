import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'teneo-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() bcMenu: MenuItem[] = [
    {label: 'User'},
    {label: 'Organization'},
    {label: 'Job'},
    {label: 'Run'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
