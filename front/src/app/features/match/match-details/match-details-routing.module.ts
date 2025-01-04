import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailsComponent } from './match-details.component';

export const routes_match_details: Routes = [
  { path: 'match/:id', component: MatchDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes_match_details)],
  exports: [RouterModule],
})
export class MatchDetailsRoutingModule {}
