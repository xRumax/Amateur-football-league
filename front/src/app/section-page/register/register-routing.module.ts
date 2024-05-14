import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

export const routes_register: Routes = [
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes_register)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
