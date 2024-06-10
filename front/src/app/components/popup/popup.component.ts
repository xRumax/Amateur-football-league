import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  userId: string;

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService
  ) {
    if (!data || !data.userId) {
      throw new Error('User ID is not provided');
    }
    this.userId = data.userId;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteAccount(): void {
    const userId = this.sessionService.getUserId();

    if (userId) {
      this.userService
        .deleteUser(userId)
        .then(() => {
          this.snackBar.open('User account deleted successfully', 'Close', {
            duration: 5000,
          });
          this.authService.logout(); // Wyloguj użytkownika
          this.sessionService.clearSession(); // Wyczyść sesję
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000); // Przekieruj użytkownika na stronę logowania
        })
        .catch((error) => {
          console.error('Error deleting user account:', error);
          this.snackBar.open('Server Error', 'Close', {
            duration: 5000,
          });
        });
    } else {
      console.error('User ID not found');
      this.snackBar.open('User ID not found', 'Close', {
        duration: 5000,
      });
    }
  }
}
