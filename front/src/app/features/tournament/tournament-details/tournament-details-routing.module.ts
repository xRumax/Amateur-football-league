import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentDetailsComponent } from './tournament-details.component';

export const routes_tournament_details: Routes = [
  { path: 'tournament/:id', component: TournamentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes_tournament_details)],
  exports: [RouterModule],
})
export class TournamentDetailsRoutingModule {}
