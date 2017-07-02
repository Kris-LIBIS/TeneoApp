import {
  ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation, HostBinding,
  OnDestroy
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from './datastore/reducer';
import { Store } from '@ngrx/store';
import { MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AuthLogoutAction } from './datastore/authorization/actions';
import { LoginDialogComponent } from './components/login/login-dialog.component';
import { StateService } from './services/state/state.service';
import { Subscription } from 'rxjs/Subscription';
import { go } from "@ngrx/router-store";
import { GuiValidRouteAction } from "./datastore/gui/actions";

@Component({
  moduleId: module.id,
  selector: 'teneo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class.teneo-dark-theme') dark = false;
  @HostBinding('class.teneo-app-theme') light = true;

  userName: Observable<string>;
  msgSubscription: Subscription;

  breadcrumbs: Observable<{}>;

  constructor(
    private translate: TranslateService,
    private _store: Store<IAppState>,
    private _state: StateService,
    public snackbar: MdSnackBar,
    private _element: ElementRef,
    public dialog: MdDialog
    ) {
    this.userName = this._state.currentUserName$;
  }

  ngOnInit() {
    this.translate.addLangs(['en', 'nl', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|nl|fr/) ? browserLang : 'en');
    this.msgSubscription = this._state.messages$
      .subscribe((msg) => {
        if (msg) {
          this.openSnackbar(msg.detail || msg.summary, msg.severity)
        }
      });
    this._store.dispatch(new GuiValidRouteAction());
  }

  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
  }

  logOut() {
    this._store.dispatch(new AuthLogoutAction());
  }

  logIn() {
    const config: MdDialogConfig = {
      disableClose: false,
      hasBackdrop: true,
      // backdropClass: '',
      // width: '600px',
      // height: '300px',
      // position: {
      //   top: '',
      //   bottom: '',
      //   left: '',
      //   right: ''
      // }
    };
    this.dialog.open(LoginDialogComponent, config);
  }

  toggleFullscreen() {
    const elem = this._element.nativeElement.querySelector('.content');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }

  toggleDark() {
    this.dark = !this.dark;
    this.light = !this.light;
  }

  openSnackbar(message: string, severity: string) {
    const config = new MdSnackBarConfig();
    config.duration = 2000;
    config.extraClasses = severity === 'error' ? ['sb-error'] : ['sb-success'];
    this.snackbar.open(message, 'OK', config);
  }

}

@Component({
  moduleId: module.id,
  selector: 'teneo-on-push',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OnPushComponent {
}
