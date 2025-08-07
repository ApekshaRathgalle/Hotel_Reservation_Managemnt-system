import { Routes } from '@angular/router';

export const resortRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./resort-list/resort-list.component').then(c => c.ResortListComponent)
  },
  { 
    path: ':id', 
    loadComponent: () => import('./resort-detail/resort-detail.component').then(c => c.ResortDetailComponent)
  }
];