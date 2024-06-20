import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TeamService, Team } from '../../services/team.service';
import { MatSort } from '@angular/material/sort';
import { LeagueService } from '../../services/league.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: MatTableDataSource<Team> = new MatTableDataSource<Team>([]);
  @Input() columns: { key: string; header: string }[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private router: Router
  ) {
    this.columns = this.teamService.teamcolumns;
  }

  ngOnInit() {
    this.teamService
      .getAllTeams()
      .then((teams: Team[]) => {
        const promises = teams.map((team) =>
          this.leagueService.getLeagueName(team.league_id).then((name) => {
            team.league_name = name;
            return team;
          })
        );
        return Promise.all(promises);
      })
      .then((teams: Team[]) => {
        this.data = new MatTableDataSource<Team>(teams);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
      });
  }
  getDisplayedColumns(): string[] {
    return this.columns.map((column) => column.key);
  }

  getItemValue(item: Team, key: string): any {
    return item[key as keyof Team];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.data) {
      this.data.filter = filterValue.trim().toLowerCase();
    }
  }

  onRowClicked(row: Team) {
    this.router.navigate(['/team', row.id]);
  }
}
