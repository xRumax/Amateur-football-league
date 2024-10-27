import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchUpdateComponent } from './match-update.component';

export const routes_match_update: Routes = [
  { path: 'match-update/:id', component: MatchUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes_match_update)],
  exports: [RouterModule],
})
export class MatchUpdateRoutingModule {}
