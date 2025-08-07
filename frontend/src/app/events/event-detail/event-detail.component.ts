import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Event } from '../../shared/models/property.model';

@Component({
  selector: 'app-event-detail',
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
          Loading event details...
        </div>
      </div>
    </div>

    <div *ngIf="!loading && event" class="bg-white">
      <!-- Hero Image Section -->
      <div class="relative h-96 md:h-[500px]">
        <img 
          [src]="event.images[0] || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'" 
          [alt]="event.title"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        <div class="absolute bottom-8 left-8 text-white">
          <div class="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            {{ event.category }}
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-2">{{ event.title }}</h1>
          <div class="flex items-center text-lg mb-2">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            {{ event.location }}
          </div>
          <div class="flex items-center text-lg">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            {{ event.date | date:'fullDate' }} at {{ event.date | date:'shortTime' }}
          </div>
        </div>
        <div class="absolute top-8 right-8 bg-white px-3 py-2 rounded-lg shadow-lg">
          <div class="text-center">
            <div class="text-lg font-bold text-primary-600">\${{ event.ticketPrice }}</div>
            <div class="text-xs text-gray-600">per ticket</div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p class="text-gray-600 leading-relaxed text-lg">{{ event.description }}</p>
            </div>

            <!-- Event Details -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Event Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-primary-50 p-6 rounded-lg border border-primary-200">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-primary-900">Date & Time</h3>
                      <p class="text-primary-700">{{ event.date | date:'fullDate' }}</p>
                      <p class="text-primary-700">{{ event.date | date:'shortTime' }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-primary-50 p-6 rounded-lg border border-primary-200">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-primary-900">Location</h3>
                      <p class="text-primary-700">{{ event.location }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-primary-50 p-6 rounded-lg border border-primary-200">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-primary-900">Category</h3>
                      <p class="text-primary-700">{{ event.category }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-primary-50 p-6 rounded-lg border border-primary-200">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-primary-900">Available Tickets</h3>
                      <p class="text-primary-700">{{ event.availableTickets }} remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Image Gallery -->
            <div *ngIf="event.images && event.images.length > 1" class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Event Gallery</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img 
                  *ngFor="let image of event.images.slice(1, 7)" 
                  [src]="image"
                  [alt]="event.title + ' gallery'"
                  class="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                >
              </div>
            </div>

            <!-- Important Information -->
            <div class="bg-gold-50 border border-gold-200 rounded-lg p-6">
              <h3 class="font-semibold text-gold-900 mb-3">Important Information</h3>
              <ul class="text-sm text-gold-800 space-y-2">
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-gold-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  Please arrive 30 minutes before the event starts
                </li>
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-gold-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  Tickets are non-refundable but transferable
                </li>
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-gold-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  Age restrictions may apply for certain events
                </li>
                <li class="flex items-start">
                  <svg class="w-4 h-4 text-gold-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  Photography and recording may be restricted
                </li>
              </ul>
            </div>
          </div>

          <!-- Booking Sidebar -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-8">
              <div class="text-center mb-6">
                <div class="text-3xl font-bold text-primary-600">\${{ event.ticketPrice }}</div>
                <div class="text-sm text-gray-600">per ticket</div>
              </div>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Event Date</span>
                  <span class="font-medium text-right">{{ event.date | date:'MMM d, y' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Event Time</span>
                  <span class="font-medium">{{ event.date | date:'shortTime' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Available Tickets</span>
                  <span class="font-medium" [class]="event.availableTickets > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ event.availableTickets > 0 ? event.availableTickets + ' left' : 'Sold out' }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Category</span>
                  <span class="font-medium">{{ event.category }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <a 
                  *ngIf="event.availableTickets > 0"
                  [routerLink]="['/booking']" 
                  [queryParams]="{ type: 'event', id: event._id }"
                  class="w-full btn-primary text-center block"
                >
                  Get Tickets Now
                </a>
                <button 
                  *ngIf="event.availableTickets === 0"
                  class="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Event Sold Out
                </button>
                <button class="w-full btn-secondary">
                  Share Event
                </button>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="font-semibold text-gray-900 mb-3">Need Assistance?</h3>
                <p class="text-sm text-gray-600 mb-3">
                  Our event coordinators are here to help with any questions about this event.
                </p>
                <div class="text-sm">
                  <p class="text-primary-600 font-medium">📧 events@luxstay.com</p>
                  <p class="text-primary-600 font-medium">📞 +1 (555) 123-EVENT</p>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <h3 class="font-semibold text-gray-900 mb-3">What's Included</h3>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>✓ Event admission</li>
                  <li>✓ Welcome refreshments</li>
                  <li>✓ Access to all activities</li>
                  <li>✓ Event memorabilia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="!loading && !event" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
        <p class="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <a routerLink="/events" class="btn-primary">Back to Events</a>
      </div>
    </div>
  `
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  loading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEvent(id);
    }
  }

  loadEvent(id: string): void {
    this.apiService.get<{success: boolean, data: Event}>(`/events/${id}`).subscribe({
      next: (response) => {
        this.event = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading event:', error);
        this.loading = false;
      }
    });
  }
}