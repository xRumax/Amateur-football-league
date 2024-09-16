import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsContentComponent } from './details-content.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DetailsContentComponent],
  imports: [CommonModule, MatCardModule],
  exports: [DetailsContentComponent],
})
export class DetailsContentModule {}
