import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { MatButton, MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, MatButton],
  exports: [PopupComponent],
})
export class PopupModule {}
