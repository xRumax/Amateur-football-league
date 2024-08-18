import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersBaseComponent } from './players-base.component';

export const routes_players_base: Routes = [
  {
    path: 'players-base',
    component: PlayersBaseComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes_players_base)],
  exports: [RouterModule],
})
export class PlayersBaseRoutingModule {}
