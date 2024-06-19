import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../../services/auth.guard';

export const routes_profile: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes_profile)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
