import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamHistory, TeamHistoryResponse } from '../interfaces/TeamHistoryResponse.interface';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class TeamHistoryService {

  private apiEndpoint: string = environment.API_URL + '/fixtures'; 
  private TTL: number = 24 * 60 * 60 * 1000;

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getTeamHistory(teamId: number) : Observable<TeamHistory[]> {
    const cacheData = this.cacheService.getById(teamId, 'history');
    if (cacheData != null) { return <Observable<TeamHistory[]>> cacheData; }

    const numMatches = 10;

    const parameters = new HttpParams()
      .set('team', teamId)
      .set('last', numMatches)

    return this.http.get<TeamHistoryResponse>(this.apiEndpoint, {params: parameters}).pipe(
      map((response: TeamHistoryResponse) => response.response),
      tap(teamHistory => this.cacheService.setCacheData(teamId, 'history', teamHistory)),
      catchError(err => of([]))
    )
  }
}
