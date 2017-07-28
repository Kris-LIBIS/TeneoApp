import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state/state.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../../datastore/reducer';

@Component({
  selector: 'teneo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _state: StateService, private _store: Store<IAppState>) { }

  ngOnInit() {
  }

}
