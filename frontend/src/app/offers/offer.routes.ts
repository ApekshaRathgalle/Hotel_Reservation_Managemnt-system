import { Routes } from '@angular/router';

export const offerRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./offer-list/offer-list.component').then(c => c.OfferListComponent)
  }
];