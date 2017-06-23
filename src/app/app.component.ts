import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from './datastore/reducer';
import { Store } from '@ngrx/store';
import { IGuiState } from './datastore/gui/reducer';
import { MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { IAuthState } from './datastore/authorization/reducer';
import { Observable } from 'rxjs/Observable';
import { AuthLogoutAction } from './datastore/authorization/actions';
import { LoginDialogComponent } from './components/login/login-dialog.component';

@Component({
  moduleId: module.id,
  selector: 'teneo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @HostBinding('class.teneo-dark-theme') dark = false;
  @HostBinding('class.teneo-app-theme') light = true;

  userName: Observable<string>;

  constructor(
    private translate: TranslateService,
    private _store: Store<IAppState>,
    public snackbar: MdSnackBar,
    private _element: ElementRef,
    public dialog: MdDialog
    ) {
  }

  ngOnInit() {
    this.translate.addLangs(['en', 'nl', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|nl|fr/) ? browserLang : 'en');
    this._store.select('gui')
      .map((guiState: IGuiState) => guiState.message)
      .subscribe((msg) => {
        if (msg) {
          this.openSnackbar(msg.detail || msg.summary, msg.severity)
        }
      });
    this.userName = this._store.select('authorization').map((authState: IAuthState) => authState.userName);
  }

  logOut() {
    this._store.dispatch(new AuthLogoutAction());
  }

  logIn() {
    let config: MdDialogConfig = {
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
    const loginDialog = this.dialog.open(LoginDialogComponent, config);
  }

  toggleFullscreen() {
    let elem = this._element.nativeElement.querySelector('.content');
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
    let config = new MdSnackBarConfig();
    config.duration = 2000;
    config.extraClasses = severity == 'error' ? ['sb-error'] : ['sb-success'];
    this.snackbar.open(message, 'OK', config);
  }

}

@Component({
  moduleId: module.id,
  selector: 'on-push',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OnPushComponent {
}
