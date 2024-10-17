import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMatchesComponent } from './card-matches.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CardMatchesComponent],
  imports: [CommonModule, MatCardModule],
  exports: [CardMatchesComponent],
})
export class CardMatchesModule {}
