import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { UserResponse } from '../../services/user.service';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  displayedColumns: string[] = ['login', 'email', 'password', 'isAdmin'];

  user: UserResponse | null = null;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUserId().then((data) => {
      console.log(data);
      const userId = data.user_id; // Get the user id
      console.log(userId);

      // Now make another request to get the full user data
      this.userService.getUser(userId).then((userData) => {
        console.log(userData);
        this.user = userData; // Assign the user data to this.user
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {},
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: { user: this.user },
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result from the dialog here
    });
  }
}
