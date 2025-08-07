import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'debug', 
    loadComponent: () => import('./debug/debug.component').then(c => c.DebugComponent)
  },
  { 
    path: 'home', 
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.routes').then(r => r.authRoutes)
  },
  { 
    path: 'hotels', 
    loadChildren: () => import('./hotels/hotel.routes').then(r => r.hotelRoutes)
  },
  { 
    path: 'resorts', 
    loadChildren: () => import('./resorts/resort.routes').then(r => r.resortRoutes)
  },
  { 
    path: 'weddings', 
    loadChildren: () => import('./weddings/wedding.routes').then(r => r.weddingRoutes)
  },
  { 
    path: 'events', 
    loadChildren: () => import('./events/event.routes').then(r => r.eventRoutes)
  },
  { 
    path: 'offers', 
    loadChildren: () => import('./offers/offer.routes').then(r => r.offerRoutes)
  },
  { 
    path: 'booking', 
    loadChildren: () => import('./booking/booking.routes').then(r => r.bookingRoutes)
  },
  { 
    path: 'user-dashboard', 
    loadChildren: () => import('./user-dashboard/user-dashboard.routes').then(r => r.userDashboardRoutes)
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.routes').then(r => r.adminRoutes)
  },
  { path: '**', redirectTo: '/home' }
];
