import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailsComponent } from './player-details.component';

export const routes_player_details: Routes = [
  { path: 'player/:id', component: PlayerDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes_player_details)],
  exports: [RouterModule],
})
export class PlayerDetailsRoutingModule {}
