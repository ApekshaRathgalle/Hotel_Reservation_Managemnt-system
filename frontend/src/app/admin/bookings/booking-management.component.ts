import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Booking } from '../../shared/models/booking.model';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <div class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="flex items-center space-x-4">
                  <li>
                    <a routerLink="/admin" class="text-gray-400 hover:text-gray-500">Admin</a>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                      </svg>
                      <span class="ml-4 text-sm font-medium text-gray-500">Booking Management</span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 class="text-2xl font-bold text-gray-900 mt-2">Booking Management</h1>
              <p class="text-gray-600">View and manage all customer bookings</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ bookings.length }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Confirmed</p>
                <p class="text-2xl font-bold text-gray-900">{{ getBookingsByStatus('confirmed').length }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pending</p>
                <p class="text-2xl font-bold text-gray-900">{{ getBookingsByStatus('pending').length }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900">\${{ getTotalRevenue() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bookings Table -->
        <div class="card">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">All Bookings</h2>
              <div class="flex space-x-2">
                <select class="input-field text-sm" [(ngModel)]="statusFilter" (change)="applyFilters()">
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select class="input-field text-sm" [(ngModel)]="typeFilter" (change)="applyFilters()">
                  <option value="">All Types</option>
                  <option value="hotel">Hotels</option>
                  <option value="resort">Resorts</option>
                  <option value="wedding">Wedding Halls</option>
                  <option value="event">Events</option>
                </select>
              </div>
            </div>
          </div>
          
          <div *ngIf="loading" class="p-6 text-center">
            <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-primary-600 bg-white">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading bookings...
            </div>
          </div>

          <div *ngIf="!loading && filteredBookings.length === 0" class="p-6 text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p class="text-gray-600">There are no bookings matching your criteria.</p>
          </div>

          <div *ngIf="!loading && filteredBookings.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let booking of filteredBookings" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      #{{ booking._id.slice(-6).toUpperCase() }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ booking.createdAt | date:'short' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 capitalize">
                      {{ booking.propertyType }}
                    </div>
                    <div class="text-sm text-gray-500">
                      ID: {{ booking.propertyId.slice(-6) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ booking.checkIn | date:'mediumDate' }}
                    </div>
                    <div *ngIf="booking.checkOut" class="text-sm text-gray-500">
                      to {{ booking.checkOut | date:'mediumDate' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ booking.guests }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      [class]="getStatusClass(booking.status)"
                    >
                      {{ booking.status | titlecase }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      \${{ booking.totalPrice }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button 
                        *ngIf="booking.status === 'pending'"
                        (click)="updateBookingStatus(booking._id, 'confirmed')"
                        class="text-green-600 hover:text-green-900"
                      >
                        Confirm
                      </button>
                      <button 
                        *ngIf="booking.status !== 'cancelled'"
                        (click)="updateBookingStatus(booking._id, 'cancelled')"
                        class="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                      <button class="text-primary-600 hover:text-primary-900">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingManagementComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  loading = true;
  statusFilter = '';
  typeFilter = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.apiService.get<{success: boolean, data: Booking[]}>('/bookings/all').subscribe({
      next: (response) => {
        this.bookings = response.data;
        this.filteredBookings = [...this.bookings];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.loading = false;
      }
    });
  }

  getBookingsByStatus(status: string): Booking[] {
    return this.bookings.filter(booking => booking.status === status);
  }

  getTotalRevenue(): number {
    return this.bookings
      .filter(booking => booking.status === 'confirmed')
      .reduce((sum, booking) => sum + booking.totalPrice, 0);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  applyFilters(): void {
    this.filteredBookings = this.bookings.filter(booking => {
      const statusMatch = !this.statusFilter || booking.status === this.statusFilter;
      const typeMatch = !this.typeFilter || booking.propertyType === this.typeFilter;
      return statusMatch && typeMatch;
    });
  }

  updateBookingStatus(bookingId: string, status: string): void {
    const action = status === 'confirmed' ? 'confirm' : 'cancel';
    
    if (confirm(`Are you sure you want to ${action} this booking?`)) {
      this.apiService.put<{success: boolean}>(`/bookings/${bookingId}`, { status }).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadBookings(); // Reload bookings
          }
        },
        error: (error) => {
          console.error('Error updating booking status:', error);
          alert('Failed to update booking status. Please try again.');
        }
      });
    }
  }
}