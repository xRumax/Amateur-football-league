import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { TeamService } from '../../services/team.service';
import { TournamentService } from '../../services/tournament.service';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { NavigationService } from '../../services/navigation.service';

interface DialogData {
  dataType:
    | 'profile'
    | 'team'
    | 'tournament'
    | 'player'
    | 'edit-form'
    | 'action-form';
  playerId?: number;
}

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrl: './popup-content.component.scss',
})
export class PopupContentComponent {
  dataType!: 'profile' | 'team' | 'tournament';
  title!: string;
  message: string =
    'Are you sure you want to delete your account? This action is irreversible and will result in the loss of all your data. Do you wish to proceed?';
  confirmFunction!: (id?: number) => Promise<void>;

  constructor(
    private dialogRef: MatDialogRef<PopupContentComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    private userService: UserService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private teamService: TeamService,
    private tournamentService: TournamentService,
    private playerService: PlayerService,
    private navigateService: NavigationService
  ) {
    if (data.dataType === 'profile') {
      this.title = 'Are You Sure?';
      this.message;
      this.confirmFunction = this.confirmUserDelete;
    } else if (data.dataType === 'team') {
      this.title = 'Are You Sure?';
      this.message =
        'Are you sure you want to delete your Team? This action is irreversible and will result in the loss of all your team data. Do you wish to proceed?';
      this.confirmFunction = this.confirmTeamDelete;
    } else if (data.dataType === 'tournament') {
      this.title = 'Are You Sure?';
      this.message =
        'Are you sure you want to delete this Tournament? This action is irreversible and will result in the loss of all your tournament data. Do you wish to proceed?';
      this.confirmFunction = this.confirmTournamentDelete;
    } else if (data.dataType === 'player') {
      this.title = 'Are You Sure?';
      this.message =
        'Are you sure you want to delete this Player? This action is irreversible and will result in the loss of all your tournament data. Do you wish to proceed?';
      this.confirmFunction = this.confirmPlayerDelete;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async confirmUserDelete(): Promise<void> {
    const userId = this.sessionService.getUserId();
    if (!userId) {
      console.error('User ID is null');
      return;
    }

    try {
      await this.userService.deleteUser(userId);
      this.authService.logout();
      this.dialogRef.close();
      this.snackBar.open('User has been successfully deleted', 'Close', {
        duration: 2000,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      this.snackBar.open('Error deleting user', 'Close', {
        duration: 2000,
      });
    }
  }
  async confirmTeamDelete(): Promise<void> {
    const userId = this.sessionService.getUserId();
    if (!userId) {
      console.error('User ID is null');
      return;
    }

    try {
      const userTeam = await this.userService.getUserTeam(Number(userId));
      const teamId = userTeam.id;
      await this.teamService.deleteTeam(teamId);
      this.dialogRef.close();
      this.snackBar.open('Team has been successfully deleted', 'Close', {
        duration: 2000,
      });

      setTimeout(() => {
        this.router.navigateByUrl('/teams-base').then(() => {
          window.location.reload();
        });
      }, 500);
    } catch (error) {
      console.error('Error deleting team:', error);
      this.snackBar.open('Error deleting team', 'Close', {
        duration: 2000,
      });
    }
  }

  async confirmTournamentDelete(): Promise<void> {
    const userId = this.sessionService.getUserId();
    if (!userId) {
      console.error('User ID is null');
      return;
    }

    try {
      const userTournaments = await this.userService.getUserActiveTournament(
        Number(userId)
      );
      const activeTournament = userTournaments.find(
        (tournament: any) => tournament.is_active
      );
      if (!activeTournament) {
        console.error('No active tournament found for the user');
        return;
      }
      const tournamentId = activeTournament.id;
      await this.tournamentService.deleteTournament(Number(tournamentId));
      this.dialogRef.close();
      this.snackBar.open('Tournament has been successfully deleted', 'Close', {
        duration: 2000,
      });

      setTimeout(() => {
        this.router.navigateByUrl('/tournament-base').then(() => {
          window.location.reload();
        });
      }, 500);
    } catch (error) {
      console.error('Error deleting tournament:', error);
      this.snackBar.open('Error deleting tournament', 'Close', {
        duration: 2000,
      });
    }
  }

  async confirmPlayerDelete(): Promise<void> {
    const userId = this.sessionService.getUserId();
    if (!userId) {
      console.error('User ID is null');
      return;
    }

    try {
      const playerId = this.data.playerId;
      if (!playerId) {
        console.error('Player ID is null');
        return;
      }
      await this.playerService.deletePlayer(playerId);
      this.dialogRef.close();
      this.snackBar.open('Player has been successfully deleted', 'Close', {
        duration: 2000,
      });
      setTimeout(() => {
        this.navigateService.navigateToMyTeam().then(() => {
          window.location.reload();
        });
      }, 500);
    } catch (error) {
      console.error('Error deleting player:', error);
      this.snackBar.open('Error deleting player', 'Close', {
        duration: 2000,
      });
    }
  }
}
