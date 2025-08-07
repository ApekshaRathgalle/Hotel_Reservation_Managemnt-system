import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { WeddingHall } from '../shared/models/property.model';

@Component({
  selector: 'app-wedding-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <div class="gold-gradient py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Dream Wedding Venues</h1>
          <p class="text-xl max-w-2xl mx-auto">
            Create unforgettable memories with our exquisite wedding venues and comprehensive event services
          </p>
        </div>
      </div>

      <!-- Wedding Halls Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div *ngIf="loading" class="text-center py-12">
          <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gold-600 bg-white">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gold-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading wedding venues...
          </div>
        </div>

        <div *ngIf="!loading && weddingHalls.length === 0" class="text-center py-12">
          <h3 class="text-lg font-medium text-gray-900 mb-2">No wedding venues available</h3>
          <p class="text-gray-600">Check back soon for new beautiful venues!</p>
        </div>

        <div *ngIf="!loading && weddingHalls.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let hall of weddingHalls" class="card hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative h-64">
              <img 
                [src]="hall.images[0] || 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg'" 
                [alt]="hall.name"
                class="w-full h-full object-cover rounded-t-xl"
              >
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ hall.rating || 4.8 }}</span>
                </div>
              </div>
              <div class="absolute top-4 left-4" 
                   [class]="hall.available ? 'bg-green-600 text-white' : 'bg-red-600 text-white'" 
                   class="px-2 py-1 rounded-lg text-sm font-medium">
                {{ hall.available ? 'Available' : 'Booked' }}
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ hall.name }}</h3>
              <p class="text-gray-600 mb-3 line-clamp-2">{{ hall.description }}</p>
              
              <div class="flex items-center text-gray-600 mb-3">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm">{{ hall.location }}</span>
              </div>

              <div class="flex items-center justify-between mb-4">
                <div class="text-gold-600">
                  <span class="text-2xl font-bold">\${{ hall.pricePerEvent }}</span>
                  <span class="text-sm text-gray-600">/event</span>
                </div>
                <div class="text-sm text-gray-600">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ hall.capacity }} guests
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap gap-1 mb-4">
                <span 
                  *ngFor="let amenity of hall.amenities?.slice(0, 3)" 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800"
                >
                  {{ amenity }}
                </span>
                <span 
                  *ngIf="hall.amenities && hall.amenities.length > 3" 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  +{{ hall.amenities.length - 3 }} more
                </span>
              </div>

              <div class="flex space-x-2">
                <a 
                  [routerLink]="['/weddings', hall._id]" 
                  class="flex-1 btn-secondary text-center"
                >
                  View Details
                </a>
                <a 
                  *ngIf="hall.available"
                  [routerLink]="['/booking']" 
                  [queryParams]="{ type: 'wedding', id: hall._id }"
                  class="flex-1 btn-gold text-center"
                >
                  Book Venue
                </a>
                <button 
                  *ngIf="!hall.available"
                  class="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed text-center"
                  disabled
                >
                  Not Available
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class WeddingListComponent implements OnInit {
  weddingHalls: WeddingHall[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadWeddingHalls();
  }

  loadWeddingHalls(): void {
    this.apiService.get<{success: boolean, data: WeddingHall[]}>('/weddings').subscribe({
      next: (response) => {
        this.weddingHalls = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading wedding halls:', error);
        this.loading = false;
      }
    });
  }
}