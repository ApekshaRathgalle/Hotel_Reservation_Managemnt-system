import { Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';

export const adminRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./dashbaord/admin-dashboard.component').then(c => c.AdminDashboardComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'users', 
    loadComponent: () => import('./users/user-management.component').then(c => c.UserManagementComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'bookings', 
    loadComponent: () => import('./bookings/booking-management.component').then(c => c.BookingManagementComponent),
    canActivate: [AdminGuard]
  }
];