import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//routes
import { routes_login } from './features/login/login-routing.module';
import { routes_home } from './features/home/home-routing.module';
import { routes_profile } from './features/profile/profile-routing.module';
import { routes_register } from './features/register/register-routing.module';
import { routes_teams_base } from './features/team/teams-base/teams-base-routing.module';
import { routes_team_create } from './features/team/team-create/team-create-routing.module';
import { routes_team_details } from './features/team/team-details/team-details-routing.module';
import { routes_player_create } from './features/player/player-create/player-create-routing.module';
import { routes_players_base } from './features/player/players-base/players-base-routing.module';
import { routes_player_details } from './features/player/player-details/player-details-routing.module';
import { routes_tournament_create } from './features/tournament/tournament-create/tournament-create-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  ...routes_login,
  ...routes_register,
  ...routes_home,
  ...routes_profile,
  ...routes_teams_base,
  ...routes_team_create,
  ...routes_team_details,
  ...routes_player_create,
  ...routes_players_base,
  ...routes_player_details,
  ...routes_tournament_create,
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
