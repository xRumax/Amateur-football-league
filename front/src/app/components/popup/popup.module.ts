import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [PopupComponent],
})
export class PopupModule {}