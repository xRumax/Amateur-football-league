import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../services/auth.guard';
import { MatchCreateComponent } from './match-create.component';

export const routes_match_create: Routes = [
  {
    path: 'match-create',
    component: MatchCreateComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes_match_create)],
  exports: [RouterModule],
})
export class MatchCreateRoutingModule {}
