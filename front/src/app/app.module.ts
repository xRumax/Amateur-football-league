import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormModule } from './components/form/form.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { RegisterComponent } from './features/register/register.component';
import { TeamsBaseComponent } from './features/team/teams-base/teams-base.component';
import { TeamCreateComponent } from './features/team/team-create/team-create.component';
import { TeamDetailsComponent } from './features/team/team-details/team-details.component';
import { PlayerCreateComponent } from './features/player/player-create/player-create.component';
import { PlayersBaseComponent } from './features/player/players-base/players-base.component';
import { PlayerDetailsComponent } from './features/player/player-details/player-details.component';
import { TournamentCreateComponent } from './features/tournament/tournament-create/tournament-create.component';
import { TournamentBaseComponent } from './features/tournament/tournament-base/tournament-base.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from './components/table/table.module';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PopupContentModule } from './components/popup-content/popup-content.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { DetailsContentModule } from './components/details-content/details-content.module';
import { CardModule } from './components/card/card.module';
import { MatchBaseComponent } from './features/match/match-base-finished/match-base.component';
import { CardMatchesModule } from './components/card-matches/card-matches.module';
import { TournamentDetailsComponent } from './features/tournament/tournament-details/tournament-details.component';
import { MatchManagerComponent } from './features/match/match-manager/match-manager.component';
import { ActionFormModule } from './components/action-form/action-form.module';
import { MatchUpdateComponent } from './features/match/match-update/match-update.component';
import { MatchDetailsComponent } from './features/match/match-details/match-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    TeamsBaseComponent,
    TeamCreateComponent,
    TeamDetailsComponent,
    PlayerCreateComponent,
    PlayersBaseComponent,
    PlayerDetailsComponent,
    TournamentCreateComponent,
    TournamentBaseComponent,
    MatchBaseComponent,
    TournamentDetailsComponent,
    MatchManagerComponent,
    MatchUpdateComponent,
    MatchDetailsComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    MatButtonModule,
    BrowserModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    FormModule,
    TableModule,
    MatOptionModule,
    MatSelectModule,
    PopupContentModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatSortModule,
    DetailsContentModule,
    CardModule,
    CardMatchesModule,
    ActionFormModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
