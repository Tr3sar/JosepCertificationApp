import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ClassificationResponse, Standing } from '../interfaces/ClassificationResponse.interface';
import { Observable, map, of, tap } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  private apiEndpoint: string = environment.API_URL + '/standings';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getClassification(leagueId: number) : Observable<Standing[]> {
    const cacheData = this.cacheService.getById(leagueId, 'history');
    if (cacheData != null) { return <Observable<Standing[]>> cacheData; }

    const date = new Date();
    let actualYear = date.getFullYear();

    if (date.getMonth() < 8) {
      actualYear--;
    }

    const parameters = new HttpParams()
      .set('league', leagueId)
      .set('season', actualYear)
    
    return this.http.get<ClassificationResponse>(this.apiEndpoint, {params: parameters}).pipe(
      map((classificationResponse: ClassificationResponse) => classificationResponse.response[0].league.standings[0]),
      tap(classification => this.cacheService.setCacheData(leagueId, 'classification', classification))
    )
  }
}
