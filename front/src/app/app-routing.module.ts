import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//routes
import { routes_login } from './section-page/login/login-routing.module';
import { routes_home } from './section-page/home/home-routing.module';
import { routes_profile } from './section-page/profile/profile-routing.module';
import { routes_register } from './section-page/register/register-routing.module';
import { routes_teams_base } from './section-page/teams-base/teams-base-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  ...routes_login,
  ...routes_register,
  ...routes_home,
  ...routes_profile,
  ...routes_teams_base,
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
