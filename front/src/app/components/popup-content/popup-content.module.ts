import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupContentComponent } from './popup-content.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PopupContentComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [PopupContentComponent],
})
export class PopupContentModule {}
