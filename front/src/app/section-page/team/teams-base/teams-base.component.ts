import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-teams-base',
  templateUrl: './teams-base.component.html',
  styleUrl: './teams-base.component.scss',
})
export class TeamsBaseComponent implements OnInit {
  fields: any[] = [];

  constructor(private teamService: TeamService) {}

  async ngOnInit(): Promise<void> {
    this.fields = this.teamService.generateTeamFields();
    this.fields = this.fields.filter(
      (field) => field.name === 'name' || field.name === 'league_id'
    );
  }
}
