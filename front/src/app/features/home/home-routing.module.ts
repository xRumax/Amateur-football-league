import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

export const routes_home: Routes = [{ path: 'home', component: HomeComponent }];
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
