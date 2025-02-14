import { Component, OnInit } from '@angular/core';
import { Player } from '../../../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../../services/player.service';
import { TeamService } from '../../../services/team.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupContentComponent } from '../../../components/popup-content/popup-content.component';
import { FormComponent } from '../../../components/form/form.component';
import { SessionService } from '../../../services/session.service';
import { Team } from '../../../services/team.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss',
})
export class PlayerDetailsComponent implements OnInit {
  player: Player | undefined;
  playerId: number = 0;
  dataSource = new MatTableDataSource<Player>();
  fields = [];
  isTeamPlayer: boolean = false;
  team: Team | undefined;

  playerDetails: { key: keyof Player; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'date_of_birth', label: 'Birthday' },
    { key: 'gender', label: 'Gender' },
    { key: 'team_name', label: 'Team Name' },
  ];

  playerColumns = [
    { key: 'num_of_goals', header: 'Goals' },
    { key: 'num_of_assists', header: 'Assists' },
    { key: 'num_of_yellow_cards', header: 'Yellow Cards' },
    { key: 'num_of_red_cards', header: 'Red Cards' },
    { key: 'num_of_matches_played', header: 'Matches Played' },
    { key: 'minutes_played', header: 'Minutes Played' },
  ];

  playerColumnKeys: string[] = [];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private dialog: MatDialog,
    private sessionService: SessionService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const routeId = this.route.snapshot.paramMap.get('id');
    let teamNamePromise: Promise<string | null> = Promise.resolve(null);
    if (routeId) {
      this.playerId = Number(routeId);

      this.player = await this.playerService.getPlayer(this.playerId);
      if (this.player && this.player.team_id) {
        teamNamePromise = this.teamService.getTeamNamebyId(this.player.team_id);
      }
      const [teamName] = await Promise.all([teamNamePromise]);

      if (this.player && this.player.team_id) {
        this.player.team_name = teamName ?? undefined;
      }
    }

    this.playerColumnKeys = this.playerColumns.map((column) => column.key);

    if (this.player) {
      this.dataSource.data = [this.player];
    }

    const userId = this.sessionService.getUserId();
    if (userId) {
      const teamDetails = await this.userService.getUserTeamDetails(
        Number(userId)
      );
      if (teamDetails && teamDetails.players) {
        this.isTeamPlayer = teamDetails.players.some(
          (player: any) => player.id === this.playerId
        );
      }
    }
  }

  openDialog(dataType: 'player'): void {
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '1000px',
      height: '300px',
      data: { dataType, playerId: this.playerId },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        formType: 'player-edit',
        playerId: this.playerId,
      },
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
