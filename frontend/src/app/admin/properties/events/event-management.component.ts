import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Event } from '../../../shared/models/property.model';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <div class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="flex items-center space-x-4">
                  <li><a routerLink="/admin" class="text-gray-400 hover:text-gray-500">Admin</a></li>
                  <li><a routerLink="/admin/properties" class="text-gray-400 hover:text-gray-500">Properties</a></li>
                  <li>
                    <div class="flex items-center">
                      <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                      </svg>
                      <span class="ml-4 text-sm font-medium text-gray-500">Events</span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 class="text-2xl font-bold text-gray-900 mt-2">Event Management</h1>
            </div>
            <button 
              (click)="openAddModal()" 
              class="btn-primary flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Event
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Events Table -->
        <div class="card">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">All Events</h2>
          </div>
          
          <div *ngIf="loading" class="p-6 text-center">
            <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-primary-600 bg-white">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading events...
            </div>
          </div>

          <div *ngIf="!loading && events.length === 0" class="p-6 text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p class="text-gray-600">Start by adding your first event.</p>
          </div>

          <div *ngIf="!loading && events.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let event of events" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-full object-cover" 
                             [src]="event.images[0] || 'https://via.placeholder.com/40'" 
                             [alt]="event.title">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ event.title }}</div>
                        <div class="text-sm text-gray-500">{{ event.description | slice:0:50 }}...</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatDate(event.date.toString()) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ event.location }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ event.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ event.availableTickets }} available
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${{ event.ticketPrice }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button (click)="editEvent(event)" class="text-primary-600 hover:text-primary-900">Edit</button>
                      <button (click)="deleteEvent(event._id)" class="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div *ngIf="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ editingEvent ? 'Edit Event' : 'Add New Event' }}
              </h3>
              <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form [formGroup]="eventForm" (ngSubmit)="saveEvent()" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Event Title</label>
                  <input type="text" formControlName="title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Category</label>
                  <select formControlName="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    <option value="">Select Category</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Concert">Concert</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Festival">Festival</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea formControlName="description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" formControlName="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" formControlName="location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Available Tickets</label>
                  <input type="number" formControlName="availableTickets" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Ticket Price ($)</label>
                  <input type="number" formControlName="ticketPrice" step="0.01" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Images</label>
                <div formArrayName="images">
                  <div *ngFor="let image of imagesArray.controls; let i = index" class="flex items-center space-x-2 mb-2">
                    <input type="url" [formControlName]="i" placeholder="Image URL" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    <button type="button" (click)="removeImage(i)" class="text-red-600 hover:text-red-800">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <button type="button" (click)="addImage()" class="mt-2 text-primary-600 hover:text-primary-800">
                  + Add Image URL
                </button>
                <p class="mt-1 text-xs text-gray-500">Add image URLs for event photos</p>
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button type="button" (click)="closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" [disabled]="eventForm.invalid || saving" class="btn-primary">
                  {{ saving ? 'Saving...' : (editingEvent ? 'Update Event' : 'Add Event') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EventManagementComponent implements OnInit {
  events: Event[] = [];
  loading = true;
  showModal = false;
  editingEvent: Event | null = null;
  saving = false;
  eventForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.eventForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      availableTickets: [0, [Validators.required, Validators.min(0)]],
      ticketPrice: [0, [Validators.required, Validators.min(0)]],
      images: this.fb.array([])
    });
  }

  get imagesArray(): FormArray {
    return this.eventForm.get('images') as FormArray;
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

  openAddModal(): void {
    this.editingEvent = null;
    this.eventForm = this.createForm();
    this.addImage();
    this.showModal = true;
  }

  editEvent(event: Event): void {
    this.editingEvent = event;
    this.eventForm = this.createForm();
    
    // Format date for input
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toISOString().split('T')[0];
    
    // Populate form
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      date: formattedDate,
      location: event.location,
      category: event.category,
      availableTickets: event.availableTickets,
      ticketPrice: event.ticketPrice
    });

    // Add images
    event.images?.forEach(image => {
      this.imagesArray.push(this.fb.control(image));
    });

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingEvent = null;
    this.eventForm.reset();
  }

  addImage(): void {
    this.imagesArray.push(this.fb.control(''));
  }

  removeImage(index: number): void {
    this.imagesArray.removeAt(index);
  }

  saveEvent(): void {
    if (this.eventForm.invalid) return;

    this.saving = true;
    const formValue = this.eventForm.value;
    
    // Filter out empty images
    formValue.images = formValue.images.filter((image: string) => image.trim());

    const request = this.editingEvent 
      ? this.apiService.put<{success: boolean}>(`/events/${this.editingEvent._id}`, formValue)
      : this.apiService.post<{success: boolean}>('/events', formValue);

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.loadEvents();
          this.closeModal();
        }
        this.saving = false;
      },
      error: (error) => {
        console.error('Error saving event:', error);
        this.saving = false;
      }
    });
  }

  deleteEvent(eventId: string): void {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      this.apiService.delete<{success: boolean}>(`/events/${eventId}`).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadEvents();
          }
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
