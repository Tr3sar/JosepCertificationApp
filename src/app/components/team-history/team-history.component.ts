import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { TeamHistory } from 'src/app/interfaces/TeamHistoryResponse.interface';
import { TeamHistoryService } from 'src/app/services/team-history.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-history.component.html',
  styleUrls: ['./team-history.component.scss']
})
export class TeamHistoryComponent implements OnInit {
  teamHistoryData$?: Observable<TeamHistory[] | null>;

  constructor(private teamHistoryService: TeamHistoryService, private route: ActivatedRoute, public location: Location) {}

  ngOnInit(): void {
    this.teamHistoryData$ = this.route.params.pipe(
      switchMap(params => this.teamHistoryService.getTeamHistory(params['teamId'])),
      map(history => history.length === 0 ? null : history)
    )
  }
}
