import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Event } from '../../shared/models/property.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <div class="hero-gradient py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Exclusive Events</h1>
          <p class="text-xl max-w-2xl mx-auto">
            Join us for unforgettable experiences with our curated collection of special events and entertainment
          </p>
        </div>
      </div>

      <!-- Events Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div *ngIf="loading" class="text-center py-12">
          <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-primary-600 bg-white">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading events...
          </div>
        </div>

        <div *ngIf="!loading && events.length === 0" class="text-center py-12">
          <h3 class="text-lg font-medium text-gray-900 mb-2">No events available</h3>
          <p class="text-gray-600">Check back soon for exciting upcoming events!</p>
        </div>

        <div *ngIf="!loading && events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let event of events" class="card hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative h-64">
              <img 
                [src]="event.images[0] || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'" 
                [alt]="event.title"
                class="w-full h-full object-cover rounded-t-xl"
              >
              <div class="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                {{ event.category }}
              </div>
              <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
                <div class="text-sm font-medium text-gray-900">
                  {{ event.date | date:'MMM d' }}
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
              <p class="text-gray-600 mb-3 line-clamp-2">{{ event.description }}</p>
              
              <div class="flex items-center text-gray-600 mb-3">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm">{{ event.location }}</span>
              </div>

              <div class="flex items-center text-gray-600 mb-4">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm">{{ event.date | date:'fullDate' }}</span>
              </div>

              <div class="flex items-center justify-between mb-4">
                <div class="text-primary-600">
                  <span class="text-2xl font-bold">\${{ event.ticketPrice }}</span>
                  <span class="text-sm text-gray-600">/ticket</span>
                </div>
                <div class="text-sm text-gray-600">
                  {{ event.availableTickets }} tickets left
                </div>
              </div>

              <div class="flex space-x-2">
                <a 
                  [routerLink]="['/events', event._id]" 
                  class="flex-1 btn-secondary text-center"
                >
                  View Details
                </a>
                <a 
                  *ngIf="event.availableTickets > 0"
                  [routerLink]="['/booking']" 
                  [queryParams]="{ type: 'event', id: event._id }"
                  class="flex-1 btn-primary text-center"
                >
                  Get Tickets
                </a>
                <button 
                  *ngIf="event.availableTickets === 0"
                  class="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed text-center"
                  disabled
                >
                  Sold Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.apiService.get<{success: boolean, data: Event[]}>('/events').subscribe({
      next: (response) => {
        this.events = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.loading = false;
      }
    });
  }
}