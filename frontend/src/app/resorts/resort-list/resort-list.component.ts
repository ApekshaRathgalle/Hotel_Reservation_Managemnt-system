import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Resort } from '../../shared/models/property.model';

@Component({
  selector: 'app-resort-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <div class="hero-gradient py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Paradise Resorts</h1>
          <p class="text-xl max-w-2xl mx-auto">
            Escape to tropical paradise with our exclusive collection of luxury beach resorts and mountain retreats
          </p>
        </div>
      </div>

      <!-- Resorts Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div *ngIf="loading" class="text-center py-12">
          <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-primary-600 bg-white">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading resorts...
          </div>
        </div>

        <div *ngIf="!loading && resorts.length === 0" class="text-center py-12">
          <h3 class="text-lg font-medium text-gray-900 mb-2">No resorts available</h3>
          <p class="text-gray-600">Check back soon for new paradise destinations!</p>
        </div>

        <div *ngIf="!loading && resorts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let resort of resorts" class="card hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative h-64">
              <img 
                [src]="resort.images[0] || 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg'" 
                [alt]="resort.name"
                class="w-full h-full object-cover rounded-t-xl"
              >
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ resort.rating || 4.7 }}</span>
                </div>
              </div>
              <div class="absolute top-4 left-4 bg-primary-600 text-white px-2 py-1 rounded-lg text-sm font-medium">
                Resort
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ resort.name }}</h3>
              <p class="text-gray-600 mb-3 line-clamp-2">{{ resort.description }}</p>
              
              <div class="flex items-center text-gray-600 mb-3">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm">{{ resort.location }}</span>
              </div>

              <div class="flex items-center justify-between mb-4">
                <div class="text-primary-600">
                  <span class="text-2xl font-bold">\${{ resort.pricePerNight }}</span>
                  <span class="text-sm text-gray-600">/night</span>
                </div>
                <div class="text-sm text-gray-600">
                  {{ resort.availableRooms }} rooms available
                </div>
              </div>

              <!-- Activities -->
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">Activities</h4>
                <div class="flex flex-wrap gap-1">
                  <span 
                    *ngFor="let activity of resort.activities?.slice(0, 3)" 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800"
                  >
                    {{ activity }}
                  </span>
                  <span 
                    *ngIf="resort.activities && resort.activities.length > 3" 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    +{{ resort.activities.length - 3 }} more
                  </span>
                </div>
              </div>

              <div class="flex space-x-2">
                <a 
                  [routerLink]="['/resorts', resort._id]" 
                  class="flex-1 btn-secondary text-center"
                >
                  View Details
                </a>
                <a 
                  [routerLink]="['/booking']" 
                  [queryParams]="{ type: 'resort', id: resort._id }"
                  class="flex-1 btn-primary text-center"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ResortListComponent implements OnInit {
  resorts: Resort[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadResorts();
  }

  loadResorts(): void {
    this.apiService.get<{success: boolean, data: Resort[]}>('/resorts').subscribe({
      next: (response) => {
        this.resorts = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading resorts:', error);
        this.loading = false;
      }
    });
  }
}