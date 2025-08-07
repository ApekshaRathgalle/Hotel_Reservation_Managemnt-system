import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Hotel } from '../../shared/models/property.model';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-primary-600 bg-white">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading hotel details...
        </div>
      </div>
    </div>

    <div *ngIf="!loading && hotel" class="bg-white">
      <!-- Hero Image Section -->
      <div class="relative h-96 md:h-[500px]">
        <img 
          [src]="hotel.images[0] || 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'" 
          [alt]="hotel.name"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-black bg-opacity-30"></div>
        <div class="absolute bottom-8 left-8 text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-2">{{ hotel.name }}</h1>
          <div class="flex items-center text-lg">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            {{ hotel.location }}
          </div>
        </div>
        <div class="absolute top-8 right-8 bg-white px-3 py-2 rounded-lg shadow-lg">
          <div class="flex items-center space-x-1">
            <svg class="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="font-semibold">{{ hotel.rating || 4.5 }}</span>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">About This Hotel</h2>
              <p class="text-gray-600 leading-relaxed">{{ hotel.description }}</p>
            </div>

            <!-- Amenities -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div 
                  *ngFor="let amenity of hotel.amenities" 
                  class="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                >
                  <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">{{ amenity }}</span>
                </div>
              </div>
            </div>

            <!-- Image Gallery -->
            <div *ngIf="hotel.images && hotel.images.length > 1" class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img 
                  *ngFor="let image of hotel.images.slice(1, 7)" 
                  [src]="image"
                  [alt]="hotel.name + ' gallery'"
                  class="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                >
              </div>
            </div>
          </div>

          <!-- Booking Sidebar -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-8">
              <div class="text-center mb-6">
                <div class="text-3xl font-bold text-primary-600">\${{ hotel.pricePerNight }}</div>
                <div class="text-sm text-gray-600">per night</div>
              </div>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Available Rooms</span>
                  <span class="font-medium">{{ hotel.availableRooms }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Rating</span>
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="font-medium">{{ hotel.rating || 4.5 }}</span>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <a 
                  [routerLink]="['/booking']" 
                  [queryParams]="{ type: 'hotel', id: hotel._id }"
                  class="w-full btn-primary text-center block"
                >
                  Book This Hotel
                </a>
                <button class="w-full btn-secondary">
                  Contact Hotel
                </button>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p class="text-sm text-gray-600">
                  Our concierge team is available 24/7 to assist with your booking
                </p>
                <p class="text-sm text-primary-600 font-medium mt-2">
                  📞 +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="!loading && !hotel" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h2>
        <p class="text-gray-600 mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
        <a routerLink="/hotels" class="btn-primary">Back to Hotels</a>
      </div>
    </div>
  `
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | null = null;
  loading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHotel(id);
    }
  }

  loadHotel(id: string): void {
    this.apiService.get<{success: boolean, data: Hotel}>(`/hotels/${id}`).subscribe({
      next: (response) => {
        this.hotel = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading hotel:', error);
        this.loading = false;
      }
    });
  }
}