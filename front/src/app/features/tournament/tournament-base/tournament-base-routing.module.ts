import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentBaseComponent } from './tournament-base.component';

export const routes_tournament_base: Routes = [
  { path: 'tournament-base', component: TournamentBaseComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes_tournament_base)],
  exports: [RouterModule],
})
export class TournamentBaseRoutingModule {}
