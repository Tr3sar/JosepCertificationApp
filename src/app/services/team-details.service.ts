import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamDetails, TeamDetailsResponse } from '../interfaces/TeamDetailsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {

  private apiEndpoint: string = environment.API_URL + '/fixtures'; 
  private TTL: number = 24 * 60 * 60 * 1000;

  constructor(private http: HttpClient) { }

  getTeamHistory(teamId: number) : Observable<TeamDetails[]> {
    const cacheKey = `teamHistory_${teamId}`;
    const cacheTimestampKey = `teamHistory_${teamId}_timestamp`;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

    if (cachedData && cachedTimestamp) {
      const currentTime = new Date().getTime();
      const cachedTime = parseInt(cachedTimestamp, 10);

      if (currentTime - cachedTime < this.TTL) {
        return of(JSON.parse(cachedData));
      }
    }

    const numMatches = 10;

    const parameters = new HttpParams()
      .set('team', teamId)
      .set('last', numMatches)

    return this.http.get<TeamDetailsResponse>(this.apiEndpoint, {params: parameters}).pipe(
      map((response: TeamDetailsResponse) => response.response),
      tap(classification => localStorage.setItem(cacheKey, JSON.stringify(classification))),
      tap(() => {localStorage.setItem(cacheTimestampKey, new Date().getTime().toString())})
    )
  }
}
