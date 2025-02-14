import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchUpdateComponent } from './match-update.component';
import { AuthGuard } from '../../../services/auth.guard';

export const routes_match_update: Routes = [
  {
    path: 'match-update/:id',
    component: MatchUpdateComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes_match_update)],
  exports: [RouterModule],
})
export class MatchUpdateRoutingModule {}
