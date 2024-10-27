import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentCreateComponent } from './tournament-create.component';
import { AuthGuard } from '../../../services/auth.guard';

export const routes_tournament_create: Routes = [
  {
    path: 'tournament-create',
    component: TournamentCreateComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes_tournament_create)],
  exports: [RouterModule],
})
export class TournamentCreateRoutingModule {}
