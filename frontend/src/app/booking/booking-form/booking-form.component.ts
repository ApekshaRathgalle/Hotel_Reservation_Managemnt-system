import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Hotel, Resort, WeddingHall, Event, PropertyType } from '../../shared/models/property.model';
import { CreateBookingRequest } from '../../shared/models/booking.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Your Booking</h1>
          <p class="text-lg text-gray-600">Just a few more details to secure your reservation</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Booking Form -->
          <div class="lg:col-span-2">
            <div class="card p-8">
              <!-- Step Indicator -->
              <div class="flex items-center mb-8">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <span class="ml-2 text-sm font-medium text-primary-600">Select Property</span>
                </div>
                <div class="flex-1 h-px bg-gray-300 mx-4"></div>
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <span class="ml-2 text-sm font-medium text-primary-600">Booking Details</span>
                </div>
                <div class="flex-1 h-px bg-gray-300 mx-4"></div>
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <span class="ml-2 text-sm font-medium text-gray-600">Confirmation</span>
                </div>
              </div>

              <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
                <div *ngIf="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {{ error }}
                </div>

                <div *ngIf="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {{ success }}
                </div>

                <!-- Property Selection -->
                <div class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Select Property</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                      <select
                        formControlName="propertyType"
                        class="input-field"
                        (change)="onPropertyTypeChange()"
                      >
                        <option value="">Select property type</option>
                        <option value="hotel">Hotel</option>
                        <option value="resort">Resort</option>
                        <option value="wedding">Wedding Hall</option>
                        <option value="event">Event</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Property</label>
                      <select
                        formControlName="propertyId"
                        class="input-field"
                        [disabled]="!bookingForm.get('propertyType')?.value || loadingProperties"
                        (change)="onPropertySelect()"
                      >
                        <option value="">Select property</option>
                        <option *ngFor="let property of availableProperties" [value]="property._id">
                          {{ property.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Booking Details -->
                <div class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Booking Information</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                      <input
                        type="date"
                        formControlName="checkIn"
                        class="input-field"
                        [min]="minDate"
                        (change)="calculatePrice()"
                      >
                    </div>
                    <div *ngIf="selectedPropertyType !== 'event' && selectedPropertyType !== 'wedding'">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                      <input
                        type="date"
                        formControlName="checkOut"
                        class="input-field"
                        [min]="bookingForm.get('checkIn')?.value"
                        (change)="calculatePrice()"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        {{ getGuestLabel() }}
                      </label>
                      <input
                        type="number"
                        formControlName="guests"
                        class="input-field"
                        min="1"
                        [max]="getMaxGuests()"
                        (change)="calculatePrice()"
                      >
                    </div>
                  </div>
                </div>

                <!-- Special Requests -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea
                    formControlName="specialRequests"
                    rows="3"
                    class="input-field"
                    placeholder="Any special requirements or requests..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div class="text-center">
                  <button
                    type="submit"
                    [disabled]="bookingForm.invalid || loading"
                    class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3"
                  >
                    <span *ngIf="!loading">Complete Booking</span>
                    <span *ngIf="loading" class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Booking Summary -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              <div *ngIf="selectedProperty" class="mb-6">
                <div class="flex items-start">
                  <img 
                    [src]="getPropertyImage(selectedProperty)" 
                    [alt]="selectedProperty.name"
                    class="w-16 h-16 object-cover rounded-lg mr-4"
                  >
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">{{ selectedProperty.name }}</h4>
                    <p class="text-sm text-gray-600 capitalize">{{ selectedPropertyType }}</p>
                    <div class="flex items-center mt-1">
                      <svg class="w-4 h-4 text-gold-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span class="text-sm text-gray-600">{{ getPropertyRating(selectedProperty) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-3 mb-6 text-sm">
                <div *ngIf="bookingForm.get('checkIn')?.value" class="flex justify-between">
                  <span class="text-gray-600">Check-in</span>
                  <span class="font-medium">{{ bookingForm.get('checkIn')?.value | date:'mediumDate' }}</span>
                </div>
                <div *ngIf="bookingForm.get('checkOut')?.value" class="flex justify-between">
                  <span class="text-gray-600">Check-out</span>
                  <span class="font-medium">{{ bookingForm.get('checkOut')?.value | date:'mediumDate' }}</span>
                </div>
                <div *ngIf="bookingForm.get('guests')?.value" class="flex justify-between">
                  <span class="text-gray-600">{{ getGuestLabel() }}</span>
                  <span class="font-medium">{{ bookingForm.get('guests')?.value }}</span>
                </div>
                <div *ngIf="numberOfNights > 0" class="flex justify-between">
                  <span class="text-gray-600">Duration</span>
                  <span class="font-medium">{{ numberOfNights }} {{ numberOfNights === 1 ? 'night' : 'nights' }}</span>
                </div>
              </div>

              <div *ngIf="calculatedPrice > 0" class="border-t border-gray-200 pt-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-medium">\${{ calculatedPrice }}</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-600">Taxes & Fees</span>
                  <span class="font-medium">\${{ Math.round(calculatedPrice * 0.12) }}</span>
                </div>
                <div class="flex justify-between items-center text-lg font-bold text-primary-600 border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>\${{ calculatedPrice + Math.round(calculatedPrice * 0.12) }}</span>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <h4 class="font-semibold text-gray-900 mb-2">Booking Protection</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li class="flex items-center">
                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Free cancellation within 24hrs
                  </li>
                  <li class="flex items-center">
                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Best price guarantee
                  </li>
                  <li class="flex items-center">
                    <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    24/7 customer support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  availableProperties: any[] = [];
  selectedProperty: any = null;
  selectedPropertyType: PropertyType | '' = '';
  loadingProperties = false;
  loading = false;
  error = '';
  success = '';
  minDate = '';
  calculatedPrice = 0;
  numberOfNights = 0;

  // Make Math available in template
  Math = Math;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.bookingForm = this.fb.group({
      propertyType: ['', [Validators.required]],
      propertyId: ['', [Validators.required]],
      checkIn: ['', [Validators.required]],
      checkOut: [''],
      guests: [1, [Validators.required, Validators.min(1)]],
      specialRequests: ['']
    });
  }

  ngOnInit(): void {
    // Check for query parameters
    this.route.queryParams.subscribe(params => {
      if (params['type'] && params['id']) {
        this.bookingForm.patchValue({
          propertyType: params['type'],
          propertyId: params['id']
        });
        this.selectedPropertyType = params['type'];
        this.loadProperties();
      }
    });
  }

  onPropertyTypeChange(): void {
    const propertyType = this.bookingForm.get('propertyType')?.value;
    this.selectedPropertyType = propertyType;
    this.bookingForm.patchValue({ propertyId: '' });
    this.selectedProperty = null;
    this.calculatedPrice = 0;
    
    if (propertyType) {
      this.loadProperties();
    }
  }

  loadProperties(): void {
    if (!this.selectedPropertyType) return;

    this.loadingProperties = true;
    const endpoint = `/${this.selectedPropertyType}s`;
    
    this.apiService.get<{success: boolean, data: any[]}>(endpoint).subscribe({
      next: (response) => {
        this.availableProperties = response.data;
        this.loadingProperties = false;
        
        // If propertyId is pre-selected, find and set the property
        const preSelectedId = this.bookingForm.get('propertyId')?.value;
        if (preSelectedId) {
          this.selectedProperty = this.availableProperties.find(p => p._id === preSelectedId);
          this.calculatePrice();
        }
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.loadingProperties = false;
      }
    });
  }

  onPropertySelect(): void {
    const propertyId = this.bookingForm.get('propertyId')?.value;
    this.selectedProperty = this.availableProperties.find(p => p._id === propertyId);
    this.calculatePrice();
  }

  calculatePrice(): void {
    if (!this.selectedProperty) {
      this.calculatedPrice = 0;
      return;
    }

    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;
    const guests = this.bookingForm.get('guests')?.value || 1;

    if (this.selectedPropertyType === 'event') {
      this.calculatedPrice = this.selectedProperty.ticketPrice * guests;
      this.numberOfNights = 0;
    } else if (this.selectedPropertyType === 'wedding') {
      this.calculatedPrice = this.selectedProperty.pricePerEvent;
      this.numberOfNights = 0;
    } else if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      this.numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (this.numberOfNights > 0) {
        this.calculatedPrice = this.selectedProperty.pricePerNight * this.numberOfNights;
      } else {
        this.calculatedPrice = 0;
      }
    } else {
      this.calculatedPrice = 0;
      this.numberOfNights = 0;
    }

    // Update form with calculated price
    this.bookingForm.patchValue({
      totalPrice: this.calculatedPrice + Math.round(this.calculatedPrice * 0.12)
    });
  }

  getGuestLabel(): string {
    switch (this.selectedPropertyType) {
      case 'event':
        return 'Number of Tickets';
      case 'wedding':
        return 'Number of Guests';
      default:
        return 'Number of Guests';
    }
  }

  getMaxGuests(): number {
    if (!this.selectedProperty) return 10;
    
    switch (this.selectedPropertyType) {
      case 'wedding':
        return this.selectedProperty.capacity;
      case 'event':
        return this.selectedProperty.availableTickets;
      default:
        return 10;
    }
  }

  getPropertyImage(property: any): string {
    if (property.images && property.images.length > 0) {
      return property.images[0];
    }
    
    const defaultImages = {
      hotel: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      resort: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg',
      wedding: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      event: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
    };
    
    return defaultImages[this.selectedPropertyType as keyof typeof defaultImages] || defaultImages.hotel;
  }

  getPropertyRating(property: any): number {
    return property.rating || 4.5;
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    const formValue = this.bookingForm.value;
    const bookingData: CreateBookingRequest = {
      propertyType: formValue.propertyType,
      propertyId: formValue.propertyId,
      checkIn: new Date(formValue.checkIn),
      guests: formValue.guests,
      totalPrice: this.calculatedPrice + Math.round(this.calculatedPrice * 0.12),
      specialRequests: formValue.specialRequests
    };

    // Add checkout date for hotels and resorts
    if (formValue.checkOut && (formValue.propertyType === 'hotel' || formValue.propertyType === 'resort')) {
      bookingData.checkOut = new Date(formValue.checkOut);
    }

    this.apiService.post<{success: boolean, data: any}>('/bookings', bookingData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.success = 'Booking created successfully! Redirecting to your dashboard...';
          setTimeout(() => {
            this.router.navigate(['/user-dashboard']);
          }, 2000);
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Booking failed. Please try again.';
      }
    });
  }
}