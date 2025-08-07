import { Routes } from '@angular/router';

export const weddingRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./wedding-list.component').then(c => c.WeddingListComponent)
  },
  { 
    path: ':id', 
    loadComponent: () => import('./wedding-detail.component').then(c => c.WeddingDetailComponent)
  }
];