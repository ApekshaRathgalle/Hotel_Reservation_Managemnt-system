import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes cache

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    let token = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  }

  get<T>(endpoint: string, useCache: boolean = true): Observable<T> {
    const cacheKey = `GET:${endpoint}`;
    
    // Check cache first for GET requests
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return of(cached.data);
      } else {
        this.cache.delete(cacheKey);
      }
    }

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders()
    }).pipe(
      tap((data) => {
        if (useCache) {
          this.cache.set(cacheKey, { data, timestamp: Date.now() });
        }
      }),
      catchError((error) => {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
      })
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    // Clear related cache entries on POST
    this.clearCacheByPattern(endpoint);
    
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    // Clear related cache entries on PUT
    this.clearCacheByPattern(endpoint);
    
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  patch<T>(endpoint: string, data?: any): Observable<T> {
    // Clear related cache entries on PATCH
    this.clearCacheByPattern(endpoint);
    
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data || {}, {
      headers: this.getHeaders()
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    // Clear related cache entries on DELETE
    this.clearCacheByPattern(endpoint);
    
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  // Clear cache entries that match a pattern
  private clearCacheByPattern(pattern: string): void {
    const basePattern = pattern.split('/')[0];
    for (const key of this.cache.keys()) {
      if (key.includes(basePattern)) {
        this.cache.delete(key);
      }
    }
  }

  // Clear all cache
  clearCache(): void {
    this.cache.clear();
  }
}