import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guards';

export const userDashboardRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent),
    canActivate: [AuthGuard]
  }
];