import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerCreateComponent } from './player-create.component';
import { AuthGuard } from '../../../services/auth.guard';

export const routes_player_create: Routes = [
  {
    path: 'player-create',
    component: PlayerCreateComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes_player_create)],
  exports: [RouterModule],
})
export class PlayerCreateRoutingModule {}
