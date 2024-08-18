import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TeamService, Team } from '../../services/team.service';
import { PlayerService, Player } from '../../services/player.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dataType: 'team' | 'player' = 'team';
  @Input() columns: { key: string; header: string }[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  data: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.dataType === 'team') {
      this.loadTeamData();
    } else if (this.dataType === 'player') {
      this.loadPlayerData();
    }
  }

  private async loadTeamData() {
    this.columns = this.teamService.teamcolumns;

    try {
      const teams = await this.teamService.getAllTeamsWithLeagueName();
      this.data = new MatTableDataSource<Team>(teams);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  }

  private async loadPlayerData() {
    this.columns = this.playerService.playercolumns;

    try {
      const players = await this.playerService.getAllPlayers();
      const playerPromises = players.map(async (player) => {
        player.team_name = await this.playerService.getTeamName(player.team_id);
        return player;
      });
      const updatedPlayers = await Promise.all(playerPromises);
      this.data = new MatTableDataSource<Player>(updatedPlayers);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  }

  getDisplayedColumns(): string[] {
    return this.columns.map((column) => column.key);
  }

  getItemValue(item: any, key: string): any {
    return item[key as keyof typeof item];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.data) {
      this.data.filter = filterValue.trim().toLowerCase();
    }
  }

  onRowClicked(row: any) {
    if (this.dataType === 'team') {
      this.router.navigate(['/team', row.id]);
    } else if (this.dataType === 'player') {
      this.router.navigate(['/player', row.id]);
    }
  }
}
