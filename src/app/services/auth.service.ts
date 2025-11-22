import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8083/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, email }, 
      { withCredentials: true });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, 
      { withCredentials: true })
      .pipe(tap((response: any) => {
        if (response.username) {
          this.currentUserSubject.next({
            username: response.username,
            email: response.email,
            role: response.role
          });
        }
      }));
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => {
        this.currentUserSubject.next(null);
      }));
  }

  checkSession(): void {
    this.http.get<any>(`${this.apiUrl}/check`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response.authenticated) {
            this.currentUserSubject.next({
              username: response.username,
              email: response.email,
              role: response.role
            });
          }
        },
        error: () => this.currentUserSubject.next(null)
      });
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}