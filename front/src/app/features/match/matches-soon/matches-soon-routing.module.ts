import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesSoonComponent } from './matches-soon.component';

export const routes_matches_soon: Routes = [
  { path: 'matches-soon', component: MatchesSoonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes_matches_soon)],
  exports: [RouterModule],
})
export class MatchesSoonRoutingModule {}
