import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  tournament: any = {};
  fields: any[] = [];
  teams: any = {};
  selectedTeams: any[] = [];
  @Input() data: any;
  @Input() formType!: 'tournament';
  formStep1!: FormGroup;
  formStep2!: FormGroup;

  constructor(
    private tournamentService: TournamentService,
    private teamService: TeamService
  ) {}

  async ngOnInit(): Promise<void> {
    switch (this.formType) {
      case 'tournament':
        await this.initializeTournamentStepper();
        break;
    }
  }

  async initializeTournamentStepper(): Promise<void> {
    this.fields = this.tournamentService.generateTournamentFields(
      this.tournament
    );
    this.initializeFormStep1(this.fields);
    this.initializeFormStep2();
    this.teams = await this.teamService.getAllTeams();
    this.formStep1.get('amount_of_teams')?.valueChanges.subscribe((value) => {
      this.addTeamControls(value);
    });
  }

  initializeFormStep1(fields: any[]): void {
    const group: Record<string, any> = {};
    fields.forEach((field) => {
      group[field.name] = new FormControl(
        field.value || '',
        Validators.required
      );
    });
    this.formStep1 = new FormGroup(group);
  }

  initializeFormStep2(): void {
    this.formStep2 = new FormGroup({});
  }

  addTeamControls(amount: number): void {
    for (let i = 0; i < amount; i++) {
      const controlName = `team_${i}`;
      if (!this.formStep2.contains(controlName)) {
        const control = new FormControl('', Validators.required);
        control.valueChanges.subscribe(() => {
          this.updateSelectedTeams();
        });
        this.formStep2.addControl(controlName, control);
      }
    }
  }

  get amountOfTeams(): number {
    return this.formStep1.get('amount_of_teams')?.value || 0;
  }

  updateSelectedTeams(): void {
    this.selectedTeams = Object.values(this.formStep2.controls)
      .map((control) => control.value)
      .filter((value) => value);
  }

  getAvailableTeams(index: number): any[] {
    return this.teams.filter(
      (team: any) =>
        !this.selectedTeams.includes(team.id) ||
        this.formStep2.get(`team_${index}`)?.value === team.id
    );
  }

  async submitTournamentStepper(): Promise<void> {
    const formData = new FormData();
    formData.append('name', this.formStep1.value.name);
    formData.append('amount_of_teams', this.formStep1.value.amount_of_teams);
    await this.tournamentService.createTournament(this.formStep1.value);
  }
}
