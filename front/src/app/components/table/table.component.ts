import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService, Team } from '../../services/team.service';
import { PlayerService, Player } from '../../services/player.service';
import { ActionService } from '../../services/action.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupContentComponent } from '../popup-content/popup-content.component';
import {
  TournamentTableService,
  TournamentTable,
} from '../../services/tournament-table.py.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dataType:
    | 'team'
    | 'player'
    | 'teamPlayers'
    | 'teamStatics'
    | 'playerStatics'
    | 'matchStatics'
    | 'tournamentTable' = 'team';
  @Input() columns: { key: string; header: string }[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() teamId: number | null = null;
  @Input() playerId: number | null = null;
  @Input() matchId: number | null = null;
  @Input() tournamentId: number | undefined;

  data: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private playerService: PlayerService,
    private router: Router,
    private actionService: ActionService,
    private route: ActivatedRoute,
    private tournamentTableService: TournamentTableService
  ) {}

  ngOnInit() {
    this.data.sort = this.sort;

    if (this.dataType === 'team') {
      this.loadTeamData();
    } else if (this.dataType === 'player') {
      this.loadPlayerData();
    } else if (this.dataType === 'teamPlayers') {
      this.loadTeamPlayersData();
    } else if (this.dataType === 'teamStatics') {
      this.columns = this.teamService.staticsColumns;
      this.loadTeamStaticsData();
    } else if (this.dataType === 'playerStatics') {
      this.columns = this.actionService.playerStaticsColumns;
      this.loadPlayerStaticsData();
    } else if (this.dataType === 'tournamentTable') {
      this.loadTournamentTableData();

      this.route.params.subscribe((params) => {
        this.playerId = params['id'];
      });
    }
  }

  private async loadTournamentTableData() {
    this.columns = this.tournamentTableService.tournamentTableColumns;

    try {
      const table = await this.tournamentTableService.getTournamentTable(
        this.tournamentId!
      );

      // Pobierz nazwy drużyn
      const updatedTable = await Promise.all(
        table.map(async (row) => {
          row.team_name = await this.teamService.getTeamNamebyId(row.team_id);
          return row;
        })
      );

      // Posortuj dane po kolumnie 'points'
      updatedTable.sort((a, b) => b.points - a.points);

      this.data = new MatTableDataSource<TournamentTable>(updatedTable);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    } catch (error) {
      console.error('Error fetching tournament table:', error);
    }
  }

  private async loadTeamData() {
    this.columns = this.teamService.teamColumns;

    try {
      const teams = await this.teamService.getAllTeams();
      this.data = new MatTableDataSource<Team>(teams);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  }

  private async loadPlayerData() {
    this.columns = this.playerService.playerColumns;

    try {
      const players = await this.playerService.getAllPlayers();
      const updatedPlayers = await Promise.all(
        players.map(async (player) => {
          player.team_name = await this.playerService.getTeamName(
            player.team_id
          );
          return player;
        })
      );
      this.data = new MatTableDataSource<Player>(updatedPlayers);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  }

  private async loadTeamPlayersData() {
    this.columns = this.playerService.playerDetailsColumns.filter(
      (column) => column.key !== 'team_name'
    );

    try {
      const players = await this.playerService.getAllPlayers();
      const filteredPlayers = players.filter(
        (player) => player.team_id === this.teamId
      );

      this.data = new MatTableDataSource<Player>(filteredPlayers);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    } catch (error) {
      console.error('Error fetching players for team:', error);
    }
  }

  private async loadTeamStaticsData() {
    if (!this.teamId) {
      console.error('Player ID not provided');
      return;
    }
    try {
      const statics = await this.actionService.getTeamActions(this.teamId);
      this.data = new MatTableDataSource<any>([statics]);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    } catch (error) {
      console.error('Error fetching team actions:', error);
    }
  }

  private async loadPlayerStaticsData() {
    if (!this.playerId) {
      console.error('Player ID not provided');
      return;
    }
    try {
      const statics = await this.actionService.getPlayerActions(this.playerId);
      this.data = new MatTableDataSource<any>([statics]);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    } catch (error) {
      console.error('Error fetching player actions:', error);
    }
  }

  getDisplayedColumns(): string[] {
    return this.columns.map((column) => column.key);
  }

  getItemValue(item: any, key: string): any {
    const value = item[key as keyof typeof item];
    return value !== null && value !== undefined ? value : 0;
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
    } else if (this.dataType === 'player' || this.dataType === 'teamPlayers') {
      this.router.navigate(['/player', row.id]);
    }
  }

  openDeletePlayerDialog(playerId: number): void {
    const dialogRef = this.dialog.open(PopupContentComponent, {
      data: { dataType: 'player', playerId: playerId },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
