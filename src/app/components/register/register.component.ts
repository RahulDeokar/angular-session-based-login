import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>Register</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Username</label>
          <input type="text" [(ngModel)]="username" name="username" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit" class="btn-primary">Register</button>
        <p class="success" *ngIf="success">{{success}}</p>
        <p class="error" *ngIf="error">{{error}}</p>
      </form>
      <p>Already have an account? <a routerLink="/login">Login here</a></p>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h2 { text-align: center; color: #2c3e50; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1rem; }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #34495e;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
    }
    .btn-primary:hover { background: #27ae60; }
    .error { color: #e74c3c; text-align: center; margin-top: 1rem; }
    .success { color: #2ecc71; text-align: center; margin-top: 1rem; }
    p { text-align: center; margin-top: 1rem; }
    a { color: #3498db; text-decoration: none; }
  `]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.success = '';
    this.authService.register(this.username, this.password, this.email).subscribe({
      next: (res) => {
        this.success = res.message;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => this.error = err.error?.message || 'Registration failed'
    });
  }
}