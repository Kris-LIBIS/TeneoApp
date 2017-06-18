import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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

const routes: Routes = [
  // {
  //   path: '',
  //   children: []
  // },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [NotLoggedInGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard]},
  {path: 'runs', component: RunsComponent, canActivate: [LoggedInGuard]},
  {path: 'users', component: UsersComponent, canActivate: [LoggedInGuard]},
  {path: 'organizations', component: OrganizationsComponent, canActivate: [LoggedInGuard]},
  {path: 'workflows', component: WorkflowsComponent, canActivate: [LoggedInGuard]},
  {path: 'ingest-models', component: IngestModelsComponent, canActivate: [LoggedInGuard]},
  {path: 'representations', component: RepresentationsComponent, canActivate: [LoggedInGuard]},
  {path: 'access-rights', component: AccessRightsComponent, canActivate: [LoggedInGuard]},
  {path: 'retention-periods', component: RetentionPeriodsComponent, canActivate: [LoggedInGuard]},
  // {path: 'login', loadChildren: './login/login.module#LoginModule'},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
