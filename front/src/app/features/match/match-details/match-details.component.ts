import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionService, MatchStatics } from '../../../services/action.service';
import { MatchService, Match } from '../../../services/match.service';
import { Team } from '../../../services/team.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent implements OnInit {
  matchId: number = 0;
  match: Match | undefined;
  team: Team | undefined;
  actionsTeam1: MatchStatics[] = [];
  actionsTeam2: MatchStatics[] = [];
  currentView: 'result' | 'statics' = 'result';

  constructor(
    private actionService: ActionService,
    private matchService: MatchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId) {
      this.matchId = Number(matchId);
      this.loadMatchDetails();
      this.loadActions();
    }
  }

  async loadMatchDetails(): Promise<void> {
    try {
      this.match = await this.matchService.getMatchById(this.matchId);
      if (this.match) {
        this.loadActions();
      }
    } catch (error) {
      console.error('Error loading match details:', error);
    }
  }

  async loadActions(): Promise<void> {
    try {
      if (this.match) {
        this.actionsTeam1 = await this.actionService.getMatchActionsForTeam(
          this.matchId,
          this.match.team_1.id
        );
        this.actionsTeam2 = await this.actionService.getMatchActionsForTeam(
          this.matchId,
          this.match.team_2.id
        );
      }
    } catch (error) {
      console.error('Error loading match actions:', error);
    }
  }

  switchView(view: 'result' | 'statics'): void {
    this.currentView = view;
  }
}
