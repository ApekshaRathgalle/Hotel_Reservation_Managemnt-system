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
  },
  { 
    path: 'properties', 
    loadComponent: () => import('./properties/property-management.component').then(c => c.PropertyManagementComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'properties/hotels', 
    loadComponent: () => import('./properties/hotels/hotel-management.component').then(c => c.HotelManagementComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'properties/resorts', 
    loadComponent: () => import('./properties/resorts/resort-management.component').then(c => c.ResortManagementComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'properties/weddings', 
    loadComponent: () => import('./properties/weddings/wedding-management.component').then(c => c.WeddingManagementComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'properties/events', 
    loadComponent: () => import('./properties/events/event-management.component').then(c => c.EventManagementComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'properties/offers', 
    loadComponent: () => import('./properties/offers/offer-management.component').then(c => c.OfferManagementComponent),
    canActivate: [AdminGuard]
  }
];