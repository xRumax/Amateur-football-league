import { Component } from '@angular/core';
import { MatchService } from '../../../services/match.service';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../../../services/match.service';

@Component({
  selector: 'app-match-update',
  templateUrl: './match-update.component.html',
  styleUrl: './match-update.component.scss',
})
export class MatchUpdateComponent {
  matchId: number = 0;
  match: Match | null = null;
  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.matchId = Number(routeId);

      this.match = await this.matchService.getMatchById(this.matchId);
    }
  }
}
