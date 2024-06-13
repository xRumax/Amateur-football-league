import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrl: './popup-content.component.scss',
})
export class PopupContentComponent {
  constructor(private dialogRef: MatDialogRef<PopupContentComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
