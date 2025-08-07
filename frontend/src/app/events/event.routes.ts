import { Routes } from '@angular/router';

export const eventRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./event-list/event-list.component').then(c => c.EventListComponent)
  },
  { 
    path: ':id', 
    loadComponent: () => import('./event-detail/event-detail.component').then(c => c.EventDetailComponent)
  }
];