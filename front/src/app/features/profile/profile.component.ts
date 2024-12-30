import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserResponse } from '../../services/user.service';
import { PopupContentComponent } from '../../components/popup-content/popup-content.component';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  fields: any[] = [];
  user: UserResponse | null = null;

  constructor(private userService: UserService, private dialog: MatDialog) {}
  async ngOnInit(): Promise<void> {
    const { user, fields } = await this.userService.getUserDataAndFields();
    this.user = user;
    this.fields = fields;
  }

  openDialog(dataType: 'profile'): void {
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '1000px',
      height: '300px',
      data: { dataType },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        title: 'Edit Form',
        formType: 'user',
        data: { fields: this.fields },
      },
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openPasswordDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        title: 'Change Password',
        formType: 'password',
        data: { fields: this.fields },
      },
      height: '500px',
      width: '600px',
      panelClass: 'custom-popup',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
