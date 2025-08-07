import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <!-- Header -->
      <div class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p class="text-gray-600">Manage your hotel chain operations</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Users</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalBookings || 0 }}</p>
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
                <p class="text-sm font-medium text-gray-600">Revenue</p>
                <p class="text-2xl font-bold text-gray-900">\${{ stats.totalRevenue || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Properties</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalProperties || 0 }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Management Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <a routerLink="/admin/users" class="card p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-semibold text-gray-900">User Management</h3>
            </div>
            <p class="text-gray-600">Manage user accounts, roles, and permissions</p>
          </a>

          <a routerLink="/admin/bookings" class="card p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-semibold text-gray-900">Booking Management</h3>
            </div>
            <p class="text-gray-600">View and manage all customer bookings</p>
          </a>

          <a routerLink="/admin/properties" class="card p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-semibold text-gray-900">Property Management</h3>
            </div>
            <p class="text-gray-600">Manage hotels, resorts, wedding venues, events & offers</p>
          </a>
        </div>

        <!-- Property Management Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Property Management</h2>
            <a routerLink="/admin/properties" class="text-primary-600 hover:text-primary-700 font-medium">View All</a>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <a routerLink="/admin/properties/hotels" class="card p-4 hover:transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                </div>
                <h3 class="ml-3 font-semibold text-gray-900">Hotels</h3>
              </div>
              <p class="text-sm text-gray-600">Manage hotel properties</p>
              <div class="mt-2 text-lg font-bold text-blue-600">{{ stats.hotels || 0 }}</div>
            </a>

            <a routerLink="/admin/properties/resorts" class="card p-4 hover:transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h3 class="ml-3 font-semibold text-gray-900">Resorts</h3>
              </div>
              <p class="text-sm text-gray-600">Manage resort properties</p>
              <div class="mt-2 text-lg font-bold text-green-600">{{ stats.resorts || 0 }}</div>
            </a>

            <a routerLink="/admin/properties/weddings" class="card p-4 hover:transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h3 class="ml-3 font-semibold text-gray-900">Weddings</h3>
              </div>
              <p class="text-sm text-gray-600">Manage wedding venues</p>
              <div class="mt-2 text-lg font-bold text-pink-600">{{ stats.weddings || 0 }}</div>
            </a>

            <a routerLink="/admin/properties/events" class="card p-4 hover:transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h3 class="ml-3 font-semibold text-gray-900">Events</h3>
              </div>
              <p class="text-sm text-gray-600">Manage special events</p>
              <div class="mt-2 text-lg font-bold text-purple-600">{{ stats.events || 0 }}</div>
            </a>

            <a routerLink="/admin/properties/offers" class="card p-4 hover:transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h4a1 1 0 001-1v-4h2v4a1 1 0 001 1h4a1 1 0 001-1V7l-7-5z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h3 class="ml-3 font-semibold text-gray-900">Offers</h3>
              </div>
              <p class="text-sm text-gray-600">Manage special offers</p>
              <div class="mt-2 text-lg font-bold text-orange-600">{{ stats.offers || 0 }}</div>
            </a>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Quick Actions -->
          <div class="card">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <a routerLink="/admin/properties/hotels" 
                   class="w-full btn-primary text-sm py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-center block">
                  + Add Hotel
                </a>
                <a routerLink="/admin/properties/resorts" 
                   class="w-full btn-secondary text-sm py-2 px-3 rounded-md bg-green-600 hover:bg-green-700 text-white text-center block">
                  + Add Resort
                </a>
                <a routerLink="/admin/properties/weddings" 
                   class="w-full btn-secondary text-sm py-2 px-3 rounded-md bg-pink-600 hover:bg-pink-700 text-white text-center block">
                  + Add Wedding Venue
                </a>
                <a routerLink="/admin/properties/events" 
                   class="w-full btn-secondary text-sm py-2 px-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-center block">
                  + Add Event
                </a>
                <a routerLink="/admin/properties/offers" 
                   class="w-full btn-secondary text-sm py-2 px-3 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-center block">
                  + Add Offer
                </a>
              </div>
            </div>
          </div>

          <!-- Recent Bookings -->
          <div class="card">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            </div>
            <div class="p-6">
              <div *ngIf="recentBookings.length === 0" class="text-center text-gray-500 py-8">
                No recent bookings
              </div>
              <div *ngFor="let booking of recentBookings" class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p class="font-medium text-gray-900">Booking #{{ booking._id.slice(-6).toUpperCase() }}</p>
                  <p class="text-sm text-gray-600 capitalize">{{ booking.propertyType }} • {{ booking.guests }} guests</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">\${{ booking.totalPrice }}</p>
                  <span 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    [class]="getStatusClass(booking.status)"
                  >
                    {{ booking.status | titlecase }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- System Status -->
          <div class="card">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">System Status</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">API Status</span>
                  <span class="flex items-center text-green-600">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Database</span>
                  <span class="flex items-center text-green-600">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Connected
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Payment Gateway</span>
                  <span class="flex items-center text-green-600">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Active
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Email Service</span>
                  <span class="flex items-center text-green-600">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalProperties: 0,
    hotels: 0,
    resorts: 0,
    weddings: 0,
    events: 0,
    offers: 0
  };
  recentBookings: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load recent bookings
    this.apiService.get<{success: boolean, data: any[]}>('/bookings/all').subscribe({
      next: (response) => {
        this.recentBookings = response.data.slice(0, 5);
        this.stats.totalBookings = response.data.length;
        this.stats.totalRevenue = response.data.reduce((sum, booking) => sum + booking.totalPrice, 0);
      },
      error: (error) => console.error('Error loading bookings:', error)
    });

    // Load users count
    this.apiService.get<{success: boolean, data: any[]}>('/users').subscribe({
      next: (response) => {
        this.stats.totalUsers = response.data.length;
      },
      error: (error) => console.error('Error loading users:', error)
    });

    // Load property counts
    this.loadPropertyStats();
  }

  loadPropertyStats(): void {
    // Load hotels count
    this.apiService.get<{success: boolean, data: any[]}>('/hotels').subscribe({
      next: (response) => {
        this.stats.hotels = response.data.length;
        this.updateTotalProperties();
      },
      error: (error) => console.error('Error loading hotels:', error)
    });

    // Load resorts count
    this.apiService.get<{success: boolean, data: any[]}>('/resorts').subscribe({
      next: (response) => {
        this.stats.resorts = response.data.length;
        this.updateTotalProperties();
      },
      error: (error) => console.error('Error loading resorts:', error)
    });

    // Load wedding venues count
    this.apiService.get<{success: boolean, data: any[]}>('/weddings').subscribe({
      next: (response) => {
        this.stats.weddings = response.data.length;
        this.updateTotalProperties();
      },
      error: (error) => console.error('Error loading weddings:', error)
    });

    // Load events count
    this.apiService.get<{success: boolean, data: any[]}>('/events').subscribe({
      next: (response) => {
        this.stats.events = response.data.length;
        this.updateTotalProperties();
      },
      error: (error) => console.error('Error loading events:', error)
    });

    // Load offers count
    this.apiService.get<{success: boolean, data: any[]}>('/offers').subscribe({
      next: (response) => {
        this.stats.offers = response.data.length;
        this.updateTotalProperties();
      },
      error: (error) => console.error('Error loading offers:', error)
    });
  }

  updateTotalProperties(): void {
    this.stats.totalProperties = this.stats.hotels + this.stats.resorts + this.stats.weddings + this.stats.events + this.stats.offers;
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
}