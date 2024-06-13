import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormModule } from './components/form/form.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './section-page/login/login.component';
import { HomeComponent } from './section-page/home/home.component';
import { ProfileComponent } from './section-page/profile/profile.component';
import { RegisterComponent } from './section-page/register/register.component';
import { TeamsBaseComponent } from './section-page/team/teams-base/teams-base.component';
import { TeamCreateComponent } from './section-page/team/team-create/team-create.component';

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
import { FormFieldComponent } from './components/form-field/form-field.component';

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
    FormFieldComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    TableModule,
    FormModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [
    provideAnimationsAsync(),
    TeamCreateComponent,
    ProfileComponent,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
