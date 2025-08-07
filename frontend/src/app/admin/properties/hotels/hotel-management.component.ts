import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Hotel } from '../../../shared/models/property.model';

@Component({
  selector: 'app-hotel-management',
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
                      <span class="ml-4 text-sm font-medium text-gray-500">Hotels</span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 class="text-2xl font-bold text-gray-900 mt-2">Hotel Management</h1>
            </div>
            <button 
              (click)="openAddModal()" 
              class="btn-primary flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Add Hotel
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Hotels Table -->
        <div class="card">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">All Hotels</h2>
          </div>
          
          <div *ngIf="loading" class="p-6 text-center">
            <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-primary-600 bg-white">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading hotels...
            </div>
          </div>

          <div *ngIf="!loading && hotels.length === 0" class="p-6 text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
            <p class="text-gray-600">Start by adding your first hotel.</p>
          </div>

          <div *ngIf="!loading && hotels.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Night</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Rooms</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let hotel of hotels" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-full object-cover" 
                             [src]="hotel.images[0] || 'https://via.placeholder.com/40'" 
                             [alt]="hotel.name">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ hotel.name }}</div>
                        <div class="text-sm text-gray-500">{{ hotel.description | slice:0:50 }}...</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ hotel.location }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${{ hotel.pricePerNight }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ hotel.availableRooms }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <span class="text-sm text-gray-900">{{ hotel.rating || 0 }}</span>
                      <svg class="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button (click)="editHotel(hotel)" class="text-primary-600 hover:text-primary-900">Edit</button>
                      <button (click)="deleteHotel(hotel._id)" class="text-red-600 hover:text-red-900">Delete</button>
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
                {{ editingHotel ? 'Edit Hotel' : 'Add New Hotel' }}
              </h3>
              <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form [formGroup]="hotelForm" (ngSubmit)="saveHotel()" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Hotel Name</label>
                  <input type="text" formControlName="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" formControlName="location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea formControlName="description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Price per Night ($)</label>
                  <input type="number" formControlName="pricePerNight" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Available Rooms</label>
                  <input type="number" formControlName="availableRooms" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                  <input type="number" formControlName="rating" min="0" max="5" step="0.1" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Amenities</label>
                <div formArrayName="amenities">
                  <div *ngFor="let amenity of amenitiesArray.controls; let i = index" class="flex items-center space-x-2 mb-2">
                    <input type="text" [formControlName]="i" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    <button type="button" (click)="removeAmenity(i)" class="text-red-600 hover:text-red-800">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <button type="button" (click)="addAmenity()" class="mt-2 text-primary-600 hover:text-primary-800">
                  + Add Amenity
                </button>
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
                <p class="mt-1 text-xs text-gray-500">Add image URLs for hotel photos</p>
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button type="button" (click)="closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" [disabled]="hotelForm.invalid || saving" class="btn-primary">
                  {{ saving ? 'Saving...' : (editingHotel ? 'Update Hotel' : 'Add Hotel') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HotelManagementComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = true;
  showModal = false;
  editingHotel: Hotel | null = null;
  saving = false;
  hotelForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.hotelForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadHotels();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      pricePerNight: [0, [Validators.required, Validators.min(0)]],
      availableRooms: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      amenities: this.fb.array([]),
      images: this.fb.array([])
    });
  }

  get amenitiesArray(): FormArray {
    return this.hotelForm.get('amenities') as FormArray;
  }

  get imagesArray(): FormArray {
    return this.hotelForm.get('images') as FormArray;
  }

  loadHotels(): void {
    this.apiService.get<{success: boolean, data: Hotel[]}>('/hotels').subscribe({
      next: (response) => {
        this.hotels = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading hotels:', error);
        this.loading = false;
      }
    });
  }

  openAddModal(): void {
    this.editingHotel = null;
    this.hotelForm = this.createForm();
    this.addAmenity();
    this.addImage();
    this.showModal = true;
  }

  editHotel(hotel: Hotel): void {
    this.editingHotel = hotel;
    this.hotelForm = this.createForm();
    
    // Populate form
    this.hotelForm.patchValue({
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      pricePerNight: hotel.pricePerNight,
      availableRooms: hotel.availableRooms,
      rating: hotel.rating
    });

    // Add amenities
    hotel.amenities?.forEach(amenity => {
      this.amenitiesArray.push(this.fb.control(amenity));
    });

    // Add images
    hotel.images?.forEach(image => {
      this.imagesArray.push(this.fb.control(image));
    });

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingHotel = null;
    this.hotelForm.reset();
  }

  addAmenity(): void {
    this.amenitiesArray.push(this.fb.control(''));
  }

  removeAmenity(index: number): void {
    this.amenitiesArray.removeAt(index);
  }

  addImage(): void {
    this.imagesArray.push(this.fb.control(''));
  }

  removeImage(index: number): void {
    this.imagesArray.removeAt(index);
  }

  saveHotel(): void {
    if (this.hotelForm.invalid) return;

    this.saving = true;
    const formValue = this.hotelForm.value;
    
    // Filter out empty amenities and images
    formValue.amenities = formValue.amenities.filter((amenity: string) => amenity.trim());
    formValue.images = formValue.images.filter((image: string) => image.trim());

    const request = this.editingHotel 
      ? this.apiService.put<{success: boolean}>(`/hotels/${this.editingHotel._id}`, formValue)
      : this.apiService.post<{success: boolean}>('/hotels', formValue);

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.loadHotels();
          this.closeModal();
        }
        this.saving = false;
      },
      error: (error) => {
        console.error('Error saving hotel:', error);
        this.saving = false;
      }
    });
  }

  deleteHotel(hotelId: string): void {
    if (confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
      this.apiService.delete<{success: boolean}>(`/hotels/${hotelId}`).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadHotels();
          }
        },
        error: (error) => {
          console.error('Error deleting hotel:', error);
        }
      });
    }
  }
}
