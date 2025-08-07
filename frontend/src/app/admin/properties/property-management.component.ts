import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Hotel, Resort, WeddingHall, Event, Offer } from '../../shared/models/property.model';

@Component({
  selector: 'app-property-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
                      <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                      </svg>
                      <span class="ml-4 text-sm font-medium text-gray-500">Property Management</span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 class="text-2xl font-bold text-gray-900 mt-2">Property Management</h1>
              <p class="text-gray-600">Manage all your properties and services</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Hotels</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.hotels }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Resorts</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.resorts }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Weddings</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.weddings }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Events</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.events }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM6 9a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Offers</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.offers }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Management Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Hotels Management -->
          <a routerLink="/admin/properties/hotels" class="card p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-semibold text-gray-900">Hotel Management</h3>
            </div>
            <p class="text-gray-600">Add, edit, and manage hotel properties</p>
          </a>

          <!-- Resorts Management -->
          <a routerLink="/admin/properties/resorts" class="card p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-semibold text-gray-900">Resort Management</h3>
            </div>
            <p class="text-gray-600">Manage luxury resorts and vacation properties</p>
          </a>

          <!-- Wedding Halls Management -->
          <a routerLink="/admin/properties/weddings" class="card p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-semibold text-gray-900">Wedding Venues</h3>
            </div>
            <p class="text-gray-600">Manage wedding halls and event venues</p>
          </a>

          <!-- Events Management -->
          <a routerLink="/admin/properties/events" class="card p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-semibold text-gray-900">Event Management</h3>
            </div>
            <p class="text-gray-600">Create and manage special events and activities</p>
          </a>

          <!-- Offers Management -->
          <a routerLink="/admin/properties/offers" class="card p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-semibold text-gray-900">Offers & Promotions</h3>
            </div>
            <p class="text-gray-600">Create special offers and promotional campaigns</p>
          </a>
        </div>
      </div>
    </div>
  `
})
export class PropertyManagementComponent implements OnInit {
  stats = {
    hotels: 0,
    resorts: 0,
    weddings: 0,
    events: 0,
    offers: 0
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    // Load Hotels count
    this.apiService.get<{success: boolean, data: Hotel[]}>('/hotels').subscribe({
      next: (response) => this.stats.hotels = response.data.length,
      error: (error) => console.error('Error loading hotels:', error)
    });

    // Load Resorts count
    this.apiService.get<{success: boolean, data: Resort[]}>('/resorts').subscribe({
      next: (response) => this.stats.resorts = response.data.length,
      error: (error) => console.error('Error loading resorts:', error)
    });

    // Load Wedding Halls count
    this.apiService.get<{success: boolean, data: WeddingHall[]}>('/weddings').subscribe({
      next: (response) => this.stats.weddings = response.data.length,
      error: (error) => console.error('Error loading weddings:', error)
    });

    // Load Events count
    this.apiService.get<{success: boolean, data: Event[]}>('/events').subscribe({
      next: (response) => this.stats.events = response.data.length,
      error: (error) => console.error('Error loading events:', error)
    });

    // Load Offers count
    this.apiService.get<{success: boolean, data: Offer[]}>('/offers/all').subscribe({
      next: (response) => this.stats.offers = response.data.length,
      error: (error) => console.error('Error loading offers:', error)
    });
  }
}
