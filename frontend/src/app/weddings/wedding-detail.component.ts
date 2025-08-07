import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { WeddingHall } from '../shared/models/property.model';

@Component({
  selector: 'app-wedding-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gold-600 bg-white">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gold-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading venue details...
        </div>
      </div>
    </div>

    <div *ngIf="!loading && weddingHall" class="bg-white">
      <!-- Hero Image Section -->
      <div class="relative h-96 md:h-[500px]">
        <img 
          [src]="weddingHall.images[0] || 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg'" 
          [alt]="weddingHall.name"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-black bg-opacity-30"></div>
        <div class="absolute bottom-8 left-8 text-white">
          <div [class]="weddingHall.available ? 'bg-green-600 text-white' : 'bg-red-600 text-white'" 
               class="px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            {{ weddingHall.available ? 'Available for Booking' : 'Currently Booked' }}
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-2">{{ weddingHall.name }}</h1>
          <div class="flex items-center text-lg">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            {{ weddingHall.location }}
          </div>
        </div>
        <div class="absolute top-8 right-8 bg-white px-3 py-2 rounded-lg shadow-lg">
          <div class="flex items-center space-x-1">
            <svg class="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="font-semibold">{{ weddingHall.rating || 4.8 }}</span>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">About This Venue</h2>
              <p class="text-gray-600 leading-relaxed">{{ weddingHall.description }}</p>
            </div>

            <!-- Venue Features -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Venue Highlights</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center p-6 bg-gold-50 rounded-lg border border-gold-200">
                  <div class="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-gold-900 mb-1">Capacity</h3>
                  <p class="text-gold-700">{{ weddingHall.capacity }} Guests</p>
                </div>
                
                <div class="text-center p-6 bg-gold-50 rounded-lg border border-gold-200">
                  <div class="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-gold-900 mb-1">Rating</h3>
                  <p class="text-gold-700">{{ weddingHall.rating || 4.8 }} Stars</p>
                </div>
                
                <div class="text-center p-6 bg-gold-50 rounded-lg border border-gold-200">
                  <div class="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-gold-900 mb-1">Status</h3>
                  <p class="text-gold-700">{{ weddingHall.available ? 'Available' : 'Booked' }}</p>
                </div>
              </div>
            </div>

            <!-- Amenities -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Wedding Services & Amenities</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div 
                  *ngFor="let amenity of weddingHall.amenities" 
                  class="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                >
                  <svg class="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">{{ amenity }}</span>
                </div>
              </div>
            </div>

            <!-- Image Gallery -->
            <div *ngIf="weddingHall.images && weddingHall.images.length > 1" class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Venue Gallery</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img 
                  *ngFor="let image of weddingHall.images.slice(1, 7)" 
                  [src]="image"
                  [alt]="weddingHall.name + ' gallery'"
                  class="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                >
              </div>
            </div>
          </div>

          <!-- Booking Sidebar -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-8">
              <div class="text-center mb-6">
                <div class="text-3xl font-bold text-gold-600">\${{ weddingHall.pricePerEvent }}</div>
                <div class="text-sm text-gray-600">complete event package</div>
              </div>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Max Capacity</span>
                  <span class="font-medium">{{ weddingHall.capacity }} guests</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Venue Rating</span>
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="font-medium">{{ weddingHall.rating || 4.8 }}</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Availability</span>
                  <span [class]="weddingHall.available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'">
                    {{ weddingHall.available ? 'Available' : 'Booked' }}
                  </span>
                </div>
              </div>

              <div class="space-y-3">
                <a 
                  *ngIf="weddingHall.available"
                  [routerLink]="['/booking']" 
                  [queryParams]="{ type: 'wedding', id: weddingHall._id }"
                  class="w-full btn-gold text-center block"
                >
                  Book This Venue
                </a>
                <button 
                  *ngIf="!weddingHall.available"
                  class="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Currently Not Available
                </button>
                <button class="w-full btn-secondary">
                  Schedule Tour
                </button>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="font-semibold text-gray-900 mb-3">Wedding Planning Services</h3>
                <ul class="text-sm text-gray-600 space-y-2">
                  <li class="flex items-center">
                    <svg class="w-4 h-4 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Dedicated wedding planner
                  </li>
                  <li class="flex items-center">
                    <svg class="w-4 h-4 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Custom decoration options
                  </li>
                  <li class="flex items-center">
                    <svg class="w-4 h-4 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Preferred vendor network
                  </li>
                  <li class="flex items-center">
                    <svg class="w-4 h-4 text-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Day-of coordination
                  </li>
                </ul>
                
                <div class="mt-4 pt-4 border-t border-gray-200">
                  <p class="text-sm text-gray-600">
                    Contact our wedding specialists for a personalized consultation
                  </p>
                  <p class="text-sm text-gold-600 font-medium mt-2">
                    📞 +1 (555) 123-LOVE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="!loading && !weddingHall" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Wedding Venue Not Found</h2>
        <p class="text-gray-600 mb-6">The venue you're looking for doesn't exist or has been removed.</p>
        <a routerLink="/weddings" class="btn-gold">Back to Wedding Venues</a>
      </div>
    </div>
  `
})
export class WeddingDetailComponent implements OnInit {
  weddingHall: WeddingHall | null = null;
  loading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadWeddingHall(id);
    }
  }

  loadWeddingHall(id: string): void {
    this.apiService.get<{success: boolean, data: WeddingHall}>(`/weddings/${id}`).subscribe({
      next: (response) => {
        this.weddingHall = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading wedding hall:', error);
        this.loading = false;
      }
    });
  }
}