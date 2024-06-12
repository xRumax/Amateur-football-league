import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrl: './popup-content.component.scss',
})
export class PopupContentComponent {
  constructor(public dialogRef: MatDialogRef<PopupContentComponent>) {}

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
