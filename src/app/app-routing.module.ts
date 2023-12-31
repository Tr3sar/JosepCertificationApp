import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationComponent } from './components/classification/classification.component';
import { TeamHistoryComponent } from './components/team-history/team-history.component';

const routes: Routes = [
  //Redirect to Premier League by default
  { path: '', redirectTo: 'classification/39', pathMatch: 'full'},
  {path: 'classification/:leagueId', component: ClassificationComponent},
  {path: 'team/:teamId', component: TeamHistoryComponent},
  {path: '**', redirectTo: 'classification/39'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
