import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchBaseComponent } from './match-base.component';

export const routes_match_base_finished: Routes = [
  {
    path: 'matches-finished',
    component: MatchBaseComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes_match_base_finished)],
  exports: [RouterModule],
})
export class MatchBaseRoutingModule {}
