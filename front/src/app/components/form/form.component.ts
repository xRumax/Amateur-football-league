import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService, UserResponse } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeagueService, League } from '../../services/league.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  fileName: string = '';
  display: FormControl = new FormControl('', Validators.required);
  @Input() data: any;
  @Input() formType!: 'user' | 'team' | 'player';

  form: FormGroup;
  fields: any[] = [];
  user: UserResponse | null = null;
  leagues: League[] = [];
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private leagueService: LeagueService,
    @Optional() public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private teamService: TeamService,
    private playerService: PlayerService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({});
    if (dialogData) {
      this.formType = dialogData.formType;
      this.data = dialogData.data;
    }
  }

  async ngOnInit(): Promise<void> {
    switch (this.formType) {
      case 'user':
        await this.initializeUserForm();
        break;
      case 'team':
        await this.initializeTeamForm();
        break;
      case 'player':
        await this.initializePlayerForm();
        break;
    }
  }

  async initializeUserForm(): Promise<void> {
    const { user, fields } = await this.userService.getUserDataAndFields();
    this.user = user;
    this.fields = fields;
    this.initializeForm(this.fields);
  }

  async initializeTeamForm(): Promise<void> {
    this.leagues = await this.leagueService.getLeagues();
    this.fields = this.teamService
      .generateTeamFields(this.leagues)
      .filter((field) => ['name', 'league_id', 'logo'].includes(field.name));
    this.initializeForm(this.fields);
  }

  async initializePlayerForm(): Promise<void> {
    this.fields = this.playerService
      .generatePlayerFields()
      .filter((field) =>
        ['name', 'last_name', 'date_of_birth', 'sex', 'team_id'].includes(
          field.name
        )
      );
    this.initializeForm(this.fields);
  }

  initializeForm(fields: any[]): void {
    const group: Record<string, any> = {};
    fields.forEach((field) => {
      group[field.name] = new FormControl(field.value || '');
    });
    this.form = new FormGroup(group);
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  async submitForm(): Promise<void> {
    if (this.form.valid) {
      try {
        switch (this.formType) {
          case 'user':
            await this.submitUserForm();
            break;
          case 'team':
            await this.submitTeamForm();
            break;
          case 'player':
            await this.submitPlayerForm();
            break;
        }
      } catch (error) {
        this.snackBar.open('Error submitting form', 'Close', {
          duration: 2000,
        });
      }
    }
  }

  async submitUserForm(): Promise<void> {
    if (this.user) {
      await this.userService.updateUser(this.user.id, this.form.value);
    }
  }

  async submitTeamForm(): Promise<void> {
    const teamName = this.form.value.name;
    const teamExists = await this.teamService.teamExists(teamName);
    if (teamExists) {
      this.snackBar.open('Team already exists', 'Close', {
        duration: 2000,
      });
      return;
    }
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('league_id', this.form.value.league_id);
    if (this.selectedFile) {
      formData.append('logo', this.selectedFile, this.selectedFile.name);
    }
    await this.teamService.createTeam(formData);
  }

  async submitPlayerForm(): Promise<void> {
    const playerName = this.form.value.name;
    const playerLastName = this.form.value.last_name;
    const playerDOB = this.form.value.date_of_birth;
    const playerExists = await this.playerService.playerExists(
      playerName,
      playerLastName,
      playerDOB
    );
    const teamId = this.form.value.team_id;

    const teamExists = await this.teamService.teamExistsById(teamId);

    if (!teamExists) {
      this.snackBar.open('Team not found', 'Close', {
        duration: 2000,
      });
      return;
    }

    if (playerExists) {
      this.snackBar.open('Player already exists', 'Close', {
        duration: 2000,
      });
      return;
    }

    await this.playerService.createPlayer(this.form.value);
    this.snackBar.open('Player created successfully', 'Close', {
      duration: 5000,
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
