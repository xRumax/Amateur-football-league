import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Tournament,
  TournamentService,
} from '../../../services/tournament.service';
import { FormField } from '../../../app.component';
import { Match } from '../../../services/match.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupContentComponent } from '../../../components/popup-content/popup-content.component';
import { FormComponent } from '../../../components/form/form.component';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss',
})
export class TournamentDetailsComponent {
  teams: any = [];
  tournament: Tournament | undefined;
  matches: Match[] = [];
  fields: FormField[] = [];
  currentView: 'teams' | 'matches' | 'table' = 'teams';
  isCreator: boolean = false;
  tournamentMatches: Match[] = [];
  tournamentId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private dialog: MatDialog,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const tournamentId = this.route.snapshot.paramMap.get('id');
    if (tournamentId) {
      this.loadTournamentDetails(Number(tournamentId));
      this.loadTournamentTeams(Number(tournamentId));
    }

    const userId = this.sessionService.getUserId();
    if (userId) {
      this.isCreator = this.tournament?.creator_id === Number(userId);
    }
  }
  loadTournamentDetails(id: number): void {
    this.tournamentService
      .getTournamentById(id)
      .then((tournament) => {
        this.tournament = tournament;
        const userId = this.sessionService.getUserId();
        if (userId && this.tournament?.creator_id === Number(userId)) {
          this.isCreator = true;
        }
      })
      .catch((error) => {
        console.error('Error loading tournament details:', error);
      });
  }

  switchView(view: 'teams' | 'matches' | 'table'): void {
    this.currentView = view;
  }

  async loadTournamentTeams(tournamentId: number): Promise<void> {
    try {
      const tournament = await this.tournamentService.getTournamentById(
        tournamentId
      );
      this.teams = tournament.teams;
    } catch (error) {
      console.error('Error loading Teams:', error);
    }
  }

  openDialog(dataType: 'tournament'): void {
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
        formType: 'tournament-edit',
        fields: this.fields,
      },
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
