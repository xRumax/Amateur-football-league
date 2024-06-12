import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService, UserResponse } from '../../services/user.service';
import { TeamService, Team } from '../../services/team.service';
import { SessionService } from '../../services/session.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() data: any;
  @Input() formType!: 'user' | 'team';

  form: FormGroup;
  fields: any[] = [];
  user: UserResponse | null = null;
  team: Team | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService,
    @Optional() public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private teamService: TeamService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({});
    if (dialogData) {
      this.formType = dialogData.formType;
      this.data = dialogData.data;
    }
  }

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({});

    if (this.formType === 'team') {
      this.fields = this.teamService.generateTeamFields();
      this.fields = this.fields.filter(
        (field) => field.name === 'name' || field.name === 'league_id'
      );
    } else if (this.formType === 'user') {
      if (this.data) {
        this.user = this.data.user;
        if (this.user !== null) {
          this.fields = this.userService.generateUserFields(this.user);
          this.addFormControls();
          this.setFormValues(this.user);
        }
      } else {
        const userId = this.sessionService.getUserId();
        if (userId !== null) {
          const user = await this.userService.getUser(+userId);
          if (user !== null) {
            this.fields = this.userService.generateUserFields(user);
            this.addFormControls();
            this.setFormValues(user);
          }
        }
      }
    }

    if (this.formType === 'team') {
      this.addFormControls(); // Add controls for team form as well
    }
  }

  addFormControls(): void {
    this.fields.forEach((field) => {
      if (!this.form.contains(field.name)) {
        this.form.addControl(field.name, new FormControl(''));
      }
    });
  }

  setFormValues(user: UserResponse): void {
    this.form.patchValue({
      username: user.username,
      email: user.email,
      // password: user.password, // Usually, you don't pre-fill the password for security reasons
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      if (this.formType === 'user') {
        if (this.user) {
          this.userService
            .updateUser(this.user.id, this.form.value)
            .then((response) => {
              // Handle user update response
            })
            .catch((error) => {
              console.error('Error updating user:', error);
            });
        }
      } else if (this.formType === 'team') {
        this.teamService
          .createTeam(this.form.value)
          .then((response) => {
            // Handle team creation response
          })
          .catch((error) => {
            console.error('Error creating team:', error);
          });
      }
    } else {
      console.error('Form is not valid');
    }
  }

  cancelForm(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['/previous-route']);
    }
  }
}
