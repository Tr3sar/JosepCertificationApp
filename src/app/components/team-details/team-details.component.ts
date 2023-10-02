import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TeamDetails } from 'src/app/interfaces/TeamDetailsResponse.interface';
import { TeamDetailsService } from 'src/app/services/team-details.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {
  teamDetailsData$?: Observable<TeamDetails[]>;

  constructor(private teamDetailsService: TeamDetailsService, private route: ActivatedRoute, public location: Location) {}

  ngOnInit(): void {
    this.teamDetailsData$ = this.route.params.pipe(
      switchMap(params => this.teamDetailsService.getTeamHistory(params['teamId']))
    )
  }
}
