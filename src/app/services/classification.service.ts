import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ClassificationResponse, Standing } from '../interfaces/ClassificationResponse.interface';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  private apiEndpoint: string = environment.API_URL + '/standings'; 
  private TTL: number = 24 * 60 * 60 * 1000;

  constructor(private http: HttpClient) { }

  getClassification(leagueId: number) : Observable<Standing[]> {
    const cacheKey = `classification_${leagueId}`;
    const cacheTimestampKey = `classification_${leagueId}_timestamp`;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

    if (cachedData && cachedTimestamp) {
      const currentTime = new Date().getTime();
      const cachedTime = parseInt(cachedTimestamp, 10);

      if (currentTime - cachedTime < this.TTL) {
        return of(JSON.parse(cachedData));
      }
    }

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
      tap(classification => localStorage.setItem(cacheKey, JSON.stringify(classification))),
      tap(() => {localStorage.setItem(cacheTimestampKey, new Date().getTime().toString())})
    )
  }
}
