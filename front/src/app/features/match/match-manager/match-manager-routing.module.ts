import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchManagerComponent } from './match-manager.component';
import { AuthGuard } from '../../../services/auth.guard';

export const routes_match_manager: Routes = [
  {
    path: 'match-manager',
    component: MatchManagerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes_match_manager)],
  exports: [RouterModule],
})
export class MatchManagerRoutingModule {}
