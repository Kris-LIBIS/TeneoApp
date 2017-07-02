import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, HttpModule } from '@angular/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent, OnPushComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './datastore/reducer';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './datastore/authorization/effects';
import { AuthorizationService } from './services/authorization/authorization.service';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { HomeComponent } from './components/home/home.component';
import { LoginDialogComponent } from './components/login/login-dialog.component';

import 'hammerjs';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StateService } from './services/state/state.service';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RunsComponent } from './components/runs/runs.component';
import { UsersComponent } from './components/users/users.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { WorkflowsComponent } from './components/workflows/workflows.component';
import { IngestModelsComponent } from './components/ingest-models/ingest-models.component';
import { RepresentationsComponent } from './components/representations/representations.component';
import { AccessRightsComponent } from './components/access-rights/access-rights.component';
import { RetentionPeriodsComponent } from './components/retention-periods/retention-periods.component';
import { IngesterApiService } from './services/ingester/ingester-api.service';
import { UserEffects } from './datastore/users/effects';
import { UserListItemComponent } from './components/users/user-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationEffects } from './datastore/organizations/effects';
import { UserEditDialogComponent } from './components/users/user-edit-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListComponent } from './components/base/list.component';
import { SelectComponent } from './components/base/select.component';
import { OrganizationListItemComponent } from './components/organizations/organization-list-item.component';
import { EditDialogComponent } from './dialogs/edit-dialog.component';
import { OrganizationEditComponent } from './components/organizations/organization-edit.component';
import { MenuComponent } from './components/layout/menu.component';
import { ToolbarComponent } from './components/layout/toolbar.component';
import { GuiEffects } from './datastore/gui/effects';
import { PagedListComponent } from './components/base/paged-list.component';
import { BreadcrumbComponent } from './components/layout/breadcrumb.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    OnPushComponent,
    HomeComponent,
    LoginDialogComponent,
    DashboardComponent,
    RunsComponent,
    UsersComponent,
    OrganizationsComponent,
    WorkflowsComponent,
    IngestModelsComponent,
    RepresentationsComponent,
    AccessRightsComponent,
    RetentionPeriodsComponent,
    UserListItemComponent,
    OrganizationListItemComponent,
    UserEditDialogComponent,
    ConfirmationDialogComponent,
    InfiniteScrollDirective,
    ListComponent,
    PagedListComponent,
    SelectComponent,
    EditDialogComponent,
    OrganizationEditComponent,
    MenuComponent,
    ToolbarComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(GuiEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(OrganizationEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    UiComponentsModule
  ],
  exports: [
    TranslateModule
  ],
  entryComponents: [
    LoginDialogComponent,
    EditDialogComponent,
    ConfirmationDialogComponent,
    UserEditDialogComponent,
    OrganizationEditComponent
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    AuthorizationService,
    IngesterApiService,
    StateService,
    NotLoggedInGuard,
    LoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
