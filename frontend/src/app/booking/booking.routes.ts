import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guards';

export const bookingRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./booking-form/booking-form.component').then(c => c.BookingFormComponent),
    canActivate: [AuthGuard]
  }
];