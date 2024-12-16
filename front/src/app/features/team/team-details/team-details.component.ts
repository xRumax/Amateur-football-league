import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Team, TeamService } from '../../../services/team.service';
import { Player, PlayerService } from '../../../services/player.service';
import { SessionService } from '../../../services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupContentComponent } from '../../../components/popup-content/popup-content.component';
import { FormComponent } from '../../../components/form/form.component';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {
  totalNumOfGoals: number = 0;
  totalNumOfYellowCards: number = 0;
  totalNumOfRedCards: number = 0;

  fields: any[] = [];
  dataSource = new MatTableDataSource<Player>(); // Initialize dataSource here
  staticsDataSource = new MatTableDataSource<any>([]); // Additional dataSource for statics
  id: number = 0; // Initialize id as number
  team: Team | undefined;
  isCreator: boolean = false;

  teamDetails: { key: keyof Team; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'matches_played', label: 'Matches played' },
    { key: 'league_name', label: 'League' },
    { key: 'creator_username', label: 'Creator' },
  ];

  playerColumnKeys: string[] = [];
  staticsColumnKeys: string[] = [];

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private sessionService: SessionService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.staticsColumnKeys = this.teamService.staticsColumns.map(
      (column) => column.key
    );
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = Number(routeId);
      this.team = await this.teamService.getTeam(this.id);
      const players = await this.playerService.getPlayerByTeamId(this.id);

      this.dataSource.data = players;

      // Calculate totals
      this.totalNumOfGoals = players.reduce(
        (sum: number, player: any) => sum + (player.num_of_goals || 0),
        0
      );
      this.totalNumOfYellowCards = players.reduce(
        (sum: number, player: any) => sum + (player.num_of_yellow_cards || 0),
        0
      );
      this.totalNumOfRedCards = players.reduce(
        (sum: number, player: any) => sum + (player.num_of_red_cards || 0),
        0
      );

      // Update staticsDataSource with totals
      this.staticsDataSource.data = [
        {
          num_of_goals: this.totalNumOfGoals,
          num_of_yellow_cards: this.totalNumOfYellowCards,
          num_of_red_cards: this.totalNumOfRedCards,
        },
      ];

      const userId = this.sessionService.getUserId();
      if (userId && this.team.creator_id === Number(userId)) {
        this.isCreator = true;
      }
    }
  }

  openDialog(dataType: 'team'): void {
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '1000px',
      height: '300px',
      data: { dataType },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        title: 'Edit Form',
        formType: 'team-edit',
        data: { fields: this.fields },
      },
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result from the dialog here
    });
  }

  openAddPlayerDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        title: 'Add Player',
        formType: 'player',
        data: { fields: this.fields },
      },
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result from the dialog here
    });
  }
}
