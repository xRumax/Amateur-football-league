import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService, UserResponse } from '../../services/user.service';

export interface FormField {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string | number | boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  fields: FormField[] = [];
  userId: number;
  user: UserResponse | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({});
    this.userId = data.user.userId; // get userId from the data
  }

  ngOnInit(): void {
    this.userService.getUserId().then((data) => {
      console.log(data);
      const userId = data.user_id; // Get the user id
      console.log(userId);

      // Now make another request to get the full user data
      this.userService.getUser(userId).then((userData) => {
        console.log(userData);
        this.user = userData; // Assign the user data to this.user

        // Generate form fields
        this.fields = this.userService.generateUserFields(this.user);
        this.fields.forEach((field) => {
          this.form.addControl(field.name, new FormControl(field.value));
        });

        // Add a control for the show password checkbox
        this.form.addControl('showPassword', new FormControl(false));
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.form.valid) {
      if (this.user) {
        this.userService
          .updateUser(this.user.id, this.form.value)
          .then((response) => {
            console.log('User updated successfully');
          })
          .catch((error) => {
            console.error('Error updating user:', error);
          });
      } else {
        console.error('User is null');
      }
    } else {
      console.error('Form is not valid');
    }
  }
}
