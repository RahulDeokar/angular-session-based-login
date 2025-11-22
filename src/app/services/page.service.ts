import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = 'http://localhost:8083/api';

  constructor(private http: HttpClient) {}

  getHome(): Observable<any> {
    return this.http.get(`${this.apiUrl}/home`, { withCredentials: true });
  }

  getAbout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/about`, { withCredentials: true });
  }

  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, { withCredentials: true });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { withCredentials: true });
  }
}
