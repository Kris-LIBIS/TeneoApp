import { Injectable } from '@angular/core';
import { Actions, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { IngesterApiService } from '../../services/ingester/ingester-api.service';
import { ORGS_LOAD_REQUEST, OrganizationsLoadFailureAction, OrganizationsLoadSuccessAction } from './actions';
import { DbUser } from '../../services/ingester/models';


@Injectable()
export class UserEffects {

  constructor(private action$: Actions, private api: IngesterApiService) {
  }

  // noinspection JSUnusedGlobalSymbols
  @Effect()
  load$: Observable<Action> = this.action$.ofType(ORGS_LOAD_REQUEST).switchMap(() => {
    const nextLoad$ = this.action$.ofType(ORGS_LOAD_REQUEST).skip(1);
    const users$: Observable<DbUser[]> = this.api.getObjectList(DbUser);
    return users$.takeUntil(nextLoad$)
      .map((users) => new OrganizationsLoadSuccessAction(users))
      .catch((err) => of(new OrganizationsLoadFailureAction({error: {type: 'Error', message: err.toString()}})));
  });

}
