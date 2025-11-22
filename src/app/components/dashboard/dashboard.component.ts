import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-content" *ngIf="pageData">
      <h1>{{pageData.message}}</h1>
      <p>{{pageData.content}}</p>
      <div class="info-card">
        <strong>Logged in as:</strong> {{pageData.user}}
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 { color: #2c3e50; margin-bottom: 1rem; }
    p { color: #7f8c8d; line-height: 1.6; }
    .info-card {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #ecf0f1;
      border-radius: 4px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  pageData: any;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService.getDashboard().subscribe(data => this.pageData = data);
  }
}
