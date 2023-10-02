import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { ClassificationResponse, Standing } from '../interfaces/ClassificationResponse.interface';
import { TeamHistory, TeamHistoryResponse } from '../interfaces/TeamHistoryResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  
  private TTL: number = 24 * 60 * 60 * 1000;
  
  getById(id: number, searchType: 'classification' | 'history') : Observable<Standing[] | TeamHistory[]> | null{
    const cacheKey = `${searchType}_${id}`;
    const cacheTimestampKey = `${searchType}_${id}_timestamp`;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

    if (cachedData && cachedTimestamp) {
      const currentTime = new Date().getTime();
      const cachedTime = parseInt(cachedTimestamp, 10);

      if (currentTime - cachedTime < this.TTL) {
        return of(JSON.parse(cachedData));
      }
    }

    return null;
  }

  setCacheData(id: number, searchType: 'classification' | 'history', data: Standing[] | TeamHistory[]) {
    const cacheKey = `${searchType}_${id}`;
    const cacheTimestampKey = `${searchType}_${id}_timestamp`;

    localStorage.setItem(cacheKey, JSON.stringify(data))
    localStorage.setItem(cacheTimestampKey, new Date().getTime().toString())
  }


}
