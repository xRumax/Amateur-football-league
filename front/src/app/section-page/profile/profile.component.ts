import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserResponse } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { PopupComponent } from '../../components/popup/popup.component';
import { PopupContentComponent } from '../../components/popup-content/popup-content.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  displayedColumns: string[] = ['login', 'email', 'password', 'isAdmin'];

  user: UserResponse | null = null;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.userService.getUserId().then((data) => {
      const userId = data.user_id; // Get the user id

      // Now make another request to get the full user data
      this.userService.getUser(userId).then((userData) => {
        this.user = userData; // Assign the user data to this.user
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { title: 'Edit Form', formType: 'user', data: { user: this.user } },
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result from the dialog here
    });
  }
}
