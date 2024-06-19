import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrl: './popup-content.component.scss',
})
export class PopupContentComponent {
  constructor(
    private dialogRef: MatDialogRef<PopupContentComponent>,
    private userService: UserService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    const userId = this.sessionService.getUserId();
    if (userId) {
      this.userService.deleteUser(userId).then(() => {
        this.authService.logout();
        this.dialogRef.close();
        this.snackBar.open('User has been successfully deleted', 'Close', {
          duration: 2000,
        });
      });
    } else {
      console.error('User ID is null');
      // Handle the error appropriately
    }
  }
}
