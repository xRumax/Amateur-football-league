import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupContentComponent } from './popup-content.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PopupContentComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [PopupContentComponent],
})
export class PopupContentModule {}
