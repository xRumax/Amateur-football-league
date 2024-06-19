import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService, UserResponse } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeagueService, League } from '../../services/league.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  leagues: League[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private leagueService: LeagueService,
    @Optional() public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {
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
      this.initializeForm(this.fields);
    }
    if (this.formType === 'team') {
      this.leagues = await this.leagueService.getLeagues();
      this.fields = this.teamService.generateTeamFields(this.leagues);
      this.fields = this.fields.filter(
        (field) => field.name === 'name' || field.name === 'league_id'
      );
      this.initializeForm(this.fields);
    }
  }

  initializeForm(fields: any[]): void {
    let group: Record<string, any> = {};
    fields.forEach((field) => {
      group[field.name] = new FormControl(field.value || '');
    });
    this.form = new FormGroup(group);
  }

  async submitForm(): Promise<void> {
    if (this.form.valid) {
      if (this.formType === 'user') {
        this.user && this.userService.updateUser(this.user.id, this.form.value);
      } else if (this.formType === 'team') {
        const teamName = this.form.value.name;
        const teamExists = await this.teamService.teamExists(teamName);
        if (teamExists) {
          this.snackBar.open('Team already exist', 'Close', {
            duration: 2000,
          });
          return;
        }
        this.teamService.createTeam(this.form.value);
      } else {
        console.error('Form is not valid');
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
