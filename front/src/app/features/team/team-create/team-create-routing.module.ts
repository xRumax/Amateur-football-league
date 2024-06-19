import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamCreateComponent } from './team-create.component';

export const routes_team_create: Routes = [
  { path: 'team-create', component: TeamCreateComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes_team_create)],
  exports: [RouterModule],
})
export class TeamCreateRoutingModule {}
