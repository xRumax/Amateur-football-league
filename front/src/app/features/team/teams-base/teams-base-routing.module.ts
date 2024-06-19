import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsBaseComponent } from './teams-base.component';

export const routes_teams_base: Routes = [
  { path: 'teams-base', component: TeamsBaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes_teams_base)],
  exports: [RouterModule],
})
export class TeamsBaseRoutingModule {}
