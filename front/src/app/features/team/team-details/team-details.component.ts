import { Component, OnInit } from '@angular/core';
import { Team } from '../../../services/team.service';
import { TeamService } from '../../../services/team.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../../../services/player.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {
  dataSource = new MatTableDataSource<Player>(); // Initialize dataSource here
  id: number = 0; // Initialize id as number
  team: Team | undefined;
  playerColumns = [{ key: 'name', header: 'Players' }];
  playerColumnKeys: string[] = [];

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.playerColumnKeys = this.playerColumns.map((column) => column.key);
    // Update id based on route parameters
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = Number(routeId);
    }

    // Fetch the team data
    this.team = await this.teamService.getTeam(this.id);
    this.dataSource.data = this.team?.players || []; // Update dataSource data here
  }
}
