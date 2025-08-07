import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../core/services/auth.service';
import { Hotel, Resort, Event, WeddingHall, Offer } from '../shared/models/property.model';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-8">API Debug Console</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Hotels Debug -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-blue-600">Hotels API</h2>
          <button (click)="testHotels()" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">Test Hotels API</button>
          <div class="bg-gray-100 p-3 rounded text-sm">
            <strong>Status:</strong> {{ hotelStatus }}<br>
            <strong>Count:</strong> {{ hotels.length }}<br>
            <div *ngIf="hotels.length > 0" class="mt-2">
              <strong>Sample:</strong> {{ hotels[0].name }}
            </div>
            <div *ngIf="hotelError" class="text-red-600 mt-2">
              <strong>Error:</strong> {{ hotelError }}
            </div>
          </div>
        </div>

        <!-- Resorts Debug -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-green-600">Resorts API</h2>
          <button (click)="testResorts()" class="bg-green-500 text-white px-4 py-2 rounded mb-4">Test Resorts API</button>
          <div class="bg-gray-100 p-3 rounded text-sm">
            <strong>Status:</strong> {{ resortStatus }}<br>
            <strong>Count:</strong> {{ resorts.length }}<br>
            <div *ngIf="resorts.length > 0" class="mt-2">
              <strong>Sample:</strong> {{ resorts[0].name }}
            </div>
            <div *ngIf="resortError" class="text-red-600 mt-2">
              <strong>Error:</strong> {{ resortError }}
            </div>
          </div>
        </div>

        <!-- Events Debug -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-purple-600">Events API</h2>
          <button (click)="testEvents()" class="bg-purple-500 text-white px-4 py-2 rounded mb-4">Test Events API</button>
          <div class="bg-gray-100 p-3 rounded text-sm">
            <strong>Status:</strong> {{ eventStatus }}<br>
            <strong>Count:</strong> {{ events.length }}<br>
            <div *ngIf="events.length > 0" class="mt-2">
              <strong>Sample:</strong> {{ events[0].title }}
            </div>
            <div *ngIf="eventError" class="text-red-600 mt-2">
              <strong>Error:</strong> {{ eventError }}
            </div>
          </div>
        </div>

        <!-- Weddings Debug -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-pink-600">Weddings API</h2>
          <button (click)="testWeddings()" class="bg-pink-500 text-white px-4 py-2 rounded mb-4">Test Weddings API</button>
          <div class="bg-gray-100 p-3 rounded text-sm">
            <strong>Status:</strong> {{ weddingStatus }}<br>
            <strong>Count:</strong> {{ weddings.length }}<br>
            <div *ngIf="weddings.length > 0" class="mt-2">
              <strong>Sample:</strong> {{ weddings[0].name }}
            </div>
            <div *ngIf="weddingError" class="text-red-600 mt-2">
              <strong>Error:</strong> {{ weddingError }}
            </div>
          </div>
        </div>

        <!-- Offers Debug -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-orange-600">Offers API</h2>
          <button (click)="testOffers()" class="bg-orange-500 text-white px-4 py-2 rounded mb-4">Test Offers API</button>
          <div class="bg-gray-100 p-3 rounded text-sm">
            <strong>Status:</strong> {{ offerStatus }}<br>
            <strong>Count:</strong> {{ offers.length }}<br>
            <div *ngIf="offers.length > 0" class="mt-2">
              <strong>Sample:</strong> {{ offers[0].title }}
            </div>
            <div *ngIf="offerError" class="text-red-600 mt-2">
              <strong>Error:</strong> {{ offerError }}
            </div>
          </div>
        </div>

        <!-- Test All -->
        <div class="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Test All APIs</h2>
          <button (click)="testAllAPIs()" class="bg-gray-500 text-white px-4 py-2 rounded mb-4">Test All APIs</button>
          <div class="bg-gray-100 p-3 rounded text-sm">
            <strong>Overall Status:</strong> {{ overallStatus }}<br>
            <strong>API Base URL:</strong> {{ apiBaseUrl }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class DebugComponent implements OnInit {
  hotels: Hotel[] = [];
  resorts: Resort[] = [];
  events: Event[] = [];
  weddings: WeddingHall[] = [];
  offers: Offer[] = [];

  hotelStatus = 'Not tested';
  resortStatus = 'Not tested';
  eventStatus = 'Not tested';
  weddingStatus = 'Not tested';
  offerStatus = 'Not tested';
  overallStatus = 'Not tested';

  hotelError = '';
  resortError = '';
  eventError = '';
  weddingError = '';
  offerError = '';

  apiBaseUrl = 'http://localhost:5000/api';

  constructor(
    public authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Auto-test all APIs on load
    this.testAllAPIs();
  }

  testHotels(): void {
    this.hotelStatus = 'Loading...';
    this.hotelError = '';
    this.apiService.get<{success: boolean, data: Hotel[]}>('/hotels').subscribe({
      next: (response) => {
        this.hotels = response.data;
        this.hotelStatus = 'Success';
        console.log('Hotels loaded:', this.hotels);
      },
      error: (error) => {
        this.hotelStatus = 'Error';
        this.hotelError = JSON.stringify(error);
        console.error('Error loading hotels:', error);
      }
    });
  }

  testResorts(): void {
    this.resortStatus = 'Loading...';
    this.resortError = '';
    this.apiService.get<{success: boolean, data: Resort[]}>('/resorts').subscribe({
      next: (response) => {
        this.resorts = response.data;
        this.resortStatus = 'Success';
        console.log('Resorts loaded:', this.resorts);
      },
      error: (error) => {
        this.resortStatus = 'Error';
        this.resortError = JSON.stringify(error);
        console.error('Error loading resorts:', error);
      }
    });
  }

  testEvents(): void {
    this.eventStatus = 'Loading...';
    this.eventError = '';
    this.apiService.get<{success: boolean, data: Event[]}>('/events').subscribe({
      next: (response) => {
        this.events = response.data;
        this.eventStatus = 'Success';
        console.log('Events loaded:', this.events);
      },
      error: (error) => {
        this.eventStatus = 'Error';
        this.eventError = JSON.stringify(error);
        console.error('Error loading events:', error);
      }
    });
  }

  testWeddings(): void {
    this.weddingStatus = 'Loading...';
    this.weddingError = '';
    this.apiService.get<{success: boolean, data: WeddingHall[]}>('/weddings').subscribe({
      next: (response) => {
        this.weddings = response.data;
        this.weddingStatus = 'Success';
        console.log('Weddings loaded:', this.weddings);
      },
      error: (error) => {
        this.weddingStatus = 'Error';
        this.weddingError = JSON.stringify(error);
        console.error('Error loading weddings:', error);
      }
    });
  }

  testOffers(): void {
    this.offerStatus = 'Loading...';
    this.offerError = '';
    this.apiService.get<{success: boolean, data: Offer[]}>('/offers').subscribe({
      next: (response) => {
        this.offers = response.data;
        this.offerStatus = 'Success';
        console.log('Offers loaded:', this.offers);
      },
      error: (error) => {
        this.offerStatus = 'Error';
        this.offerError = JSON.stringify(error);
        console.error('Error loading offers:', error);
      }
    });
  }

  testAllAPIs(): void {
    this.overallStatus = 'Testing...';
    const startTime = Date.now();
    
    Promise.all([
      this.testAPIPromise('/hotels', 'Hotels'),
      this.testAPIPromise('/resorts', 'Resorts'),
      this.testAPIPromise('/events', 'Events'),
      this.testAPIPromise('/weddings', 'Weddings'),
      this.testAPIPromise('/offers', 'Offers')
    ]).then((results) => {
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      const allSuccess = results.every(r => r.success);
      const totalRecords = results.reduce((sum, r) => sum + r.count, 0);
      
      this.overallStatus = `${allSuccess ? '✅ All APIs Working' : '❌ Some APIs Failed'} | ${totalRecords} records | ${totalTime}ms`;
      console.log('API Test Results:', results, `Total time: ${totalTime}ms`);
    }).catch((error) => {
      this.overallStatus = '❌ Test Failed';
      console.error('API Test Error:', error);
    });
  }

  private testAPIPromise(endpoint: string, name: string): Promise<{success: boolean, count: number, time: number}> {
    const startTime = Date.now();
    return new Promise((resolve) => {
      this.apiService.get<{success: boolean, data: any[]}>(endpoint).subscribe({
        next: (response) => {
          const endTime = Date.now();
          resolve({ 
            success: true, 
            count: response.data.length, 
            time: endTime - startTime 
          });
        },
        error: (error) => {
          const endTime = Date.now();
          console.error(`${name} API Error:`, error);
          resolve({ 
            success: false, 
            count: 0, 
            time: endTime - startTime 
          });
        }
      });
    });
  }
}
