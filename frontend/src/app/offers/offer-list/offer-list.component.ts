import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Offer } from '../../shared/models/property.model';

@Component({
  selector: 'app-offer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <div class="gold-gradient py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Special Offers</h1>
          <p class="text-xl max-w-2xl mx-auto">
            Discover incredible deals and exclusive packages for your perfect getaway
          </p>
        </div>
      </div>

      <!-- Offers Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div *ngIf="loading" class="text-center py-12">
          <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gold-600 bg-white">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gold-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading special offers...
          </div>
        </div>

        <div *ngIf="!loading && offers.length === 0" class="text-center py-12">
          <h3 class="text-lg font-medium text-gray-900 mb-2">No special offers available</h3>
          <p class="text-gray-600">Check back soon for amazing deals and discounts!</p>
        </div>

        <div *ngIf="!loading && offers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let offer of offers" class="card relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <!-- Discount Badge -->
            <div class="absolute top-4 left-4 z-10">
              <div class="bg-red-500 text-white px-3 py-2 rounded-full font-bold text-lg shadow-lg">
                {{ offer.discountPercentage }}% OFF
              </div>
            </div>

            <div class="relative h-64">
              <img 
                [src]="offer.images[0] || getDefaultImage(offer.applicableType)" 
                [alt]="offer.title"
                class="w-full h-full object-cover"
              >
              <div class="absolute inset-0 bg-black bg-opacity-20"></div>
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
                <div class="text-xs font-medium text-gray-900 capitalize">
                  {{ offer.applicableType }}
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ offer.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ offer.description }}</p>
              
              <!-- Valid Period -->
              <div class="bg-gold-50 border border-gold-200 rounded-lg p-3 mb-4">
                <div class="flex items-center text-gold-800 text-sm">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-medium">Valid Period</div>
                    <div>{{ offer.validFrom | date:'MMM d' }} - {{ offer.validTo | date:'MMM d, y' }}</div>
                  </div>
                </div>
              </div>

              <!-- Offer Type -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center mr-3">
                    <svg *ngIf="offer.applicableType === 'hotel'" class="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    <svg *ngIf="offer.applicableType === 'resort'" class="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                    </svg>
                    <svg *ngIf="offer.applicableType === 'wedding'" class="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                    </svg>
                    <svg *ngIf="offer.applicableType === 'event'" class="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900 capitalize">{{ offer.applicableType }}s</div>
                    <div class="text-sm text-gray-600">{{ offer.applicableIds.length }} properties available</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-red-600">{{ offer.discountPercentage }}%</div>
                  <div class="text-sm text-gray-600">discount</div>
                </div>
              </div>

              <div class="flex space-x-2">
                <a 
                  [routerLink]="getOfferLink(offer)"
                  class="flex-1 btn-secondary text-center"
                >
                  View {{ offer.applicableType | titlecase }}s
                </a>
                <a 
                  [routerLink]="['/booking']" 
                  [queryParams]="{ offer: offer._id }"
                  class="flex-1 btn-gold text-center"
                >
                  Claim Offer
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div *ngIf="!loading && offers.length > 0" class="text-center mt-12">
          <div class="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Don't Miss Out!</h2>
            <p class="text-gray-600 mb-6">
              These exclusive offers are available for a limited time. Book now to secure your savings and create unforgettable memories.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a routerLink="/booking" class="btn-gold">Book Now</a>
              <a routerLink="/auth/register" class="btn-secondary">Sign Up for More Offers</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OfferListComponent implements OnInit {
  offers: Offer[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.apiService.get<{success: boolean, data: Offer[]}>('/offers').subscribe({
      next: (response) => {
        this.offers = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading offers:', error);
        this.loading = false;
      }
    });
  }

  getDefaultImage(type: string): string {
    const defaultImages = {
      hotel: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      resort: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg',
      wedding: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      event: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
    };
    return defaultImages[type as keyof typeof defaultImages] || defaultImages.hotel;
  }

  getOfferLink(offer: Offer): string {
    const routeMap = {
      hotel: '/hotels',
      resort: '/resorts',
      wedding: '/weddings',
      event: '/events'
    };
    return routeMap[offer.applicableType as keyof typeof routeMap] || '/';
  }
}