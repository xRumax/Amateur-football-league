import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamCreateComponent } from './team-create.component';
import { AuthGuard } from '../../../services/auth.guard';

export const routes_team_create: Routes = [
  {
    path: 'team-create',
    component: TeamCreateComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes_team_create)],
  exports: [RouterModule],
})
export class TeamCreateRoutingModule {}
