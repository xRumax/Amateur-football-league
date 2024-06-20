import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailsComponent } from './team-details.component';

export const routes_team_details: Routes = [
  { path: 'team/:id', component: TeamDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes_team_details)],
  exports: [RouterModule],
})
export class TeamDetailsRoutingModule {}
