import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService, UserResponse } from '../../services/user.service';
import { TeamService, Team } from '../../services/team.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Optional() public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private teamService: TeamService
  ) {
    const group: { [key: string]: FormControl } = {};
    this.form = this.formBuilder.group({});
    if (dialogData) {
      this.formType = dialogData.formType;
      this.data = dialogData.data;
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.formType === 'user') {
      const { user, fields } = await this.userService.getUserDataAndFields();
      this.user = user;
      this.fields = fields;

      if (this.user !== null) {
        this.fields = this.userService.generateUserFields(this.user);
        const group: { [key: string]: FormControl } = {};
        this.fields.forEach((field) => {
          group[field.name] = new FormControl(field.value || '');
        });
        this.form = new FormGroup(group);
      }
    }
    if (this.formType === 'team') {
      this.fields = this.teamService.generateTeamFields();
      this.fields = this.fields.filter(
        (field) => field.name === 'name' || field.name === 'league_id'
      );

      let group: Record<string, any> = {}; // Declare the type for group
      this.fields.forEach((field) => {
        group[field.name] = new FormControl(field.value || '');
      });
      this.form = new FormGroup(group);
    }
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

  cancel(): void {
    this.dialogRef.close();
  }
}
