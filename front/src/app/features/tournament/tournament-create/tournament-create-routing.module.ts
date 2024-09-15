import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentCreateComponent } from './tournament-create.component';

export const routes_tournament_create: Routes = [
  { path: 'tournament-create', component: TournamentCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes_tournament_create)],
  exports: [RouterModule],
})
export class TournamentCreateRoutingModule {}
