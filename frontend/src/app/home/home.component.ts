import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="hero-gradient text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="animate-fade-in">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Welcome to LuxStay</h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover extraordinary experiences at our premium hotels, resorts, and wedding venues across the world
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/booking" class="btn-gold text-lg px-8 py-4 inline-block">Book Now</a>
            <a routerLink="/offers" class="bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-lg font-medium transition-colors duration-200">
              View Special Offers
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            From luxury accommodations to unforgettable events, we offer everything you need for the perfect stay
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Hotels -->
          <div class="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Luxury Hotels</h3>
            <p class="text-gray-600 mb-4">Premium accommodations with world-class amenities and exceptional service</p>
            <a routerLink="/hotels" class="text-primary-600 hover:text-primary-800 font-semibold">Explore Hotels →</a>
          </div>

          <!-- Resorts -->
          <div class="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Beach Resorts</h3>
            <p class="text-gray-600 mb-4">Tropical paradises with endless activities and breathtaking ocean views</p>
            <a routerLink="/resorts" class="text-primary-600 hover:text-primary-800 font-semibold">Explore Resorts →</a>
          </div>

          <!-- Wedding Halls -->
          <div class="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Wedding Venues</h3>
            <p class="text-gray-600 mb-4">Elegant venues perfect for your special day with comprehensive wedding services</p>
            <a routerLink="/weddings" class="text-primary-600 hover:text-primary-800 font-semibold">Explore Venues →</a>
          </div>

          <!-- Events -->
          <div class="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Special Events</h3>
            <p class="text-gray-600 mb-4">Exclusive events, concerts, and entertainment experiences for our guests</p>
            <a routerLink="/events" class="text-primary-600 hover:text-primary-800 font-semibold">View Events →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-slide-in">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Experience Luxury Like Never Before
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Our commitment to excellence ensures that every guest enjoys unparalleled comfort, 
              exceptional service, and unforgettable memories. From intimate getaways to grand celebrations, 
              we make every moment extraordinary.
            </p>
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                <span class="text-gray-700">24/7 Concierge Service</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                <span class="text-gray-700">Award-Winning Restaurants</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                <span class="text-gray-700">Spa & Wellness Centers</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                <span class="text-gray-700">Exclusive Member Benefits</span>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <img 
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" 
              alt="Luxury hotel lobby" 
              class="rounded-lg shadow-lg h-48 w-full object-cover"
            >
            <img 
              src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg" 
              alt="Hotel room" 
              class="rounded-lg shadow-lg h-48 w-full object-cover mt-8"
            >
            <img 
              src="https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg" 
              alt="Resort pool" 
              class="rounded-lg shadow-lg h-48 w-full object-cover -mt-8"
            >
            <img 
              src="https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg" 
              alt="Wedding setup" 
              class="rounded-lg shadow-lg h-48 w-full object-cover"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="gold-gradient py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your Journey?
        </h2>
        <p class="text-xl text-white mb-8 opacity-90">
          Book your perfect stay today and discover why millions of guests choose LuxStay for their most important moments.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/booking" class="bg-white text-gold-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-lg font-medium transition-colors duration-200">
            Book Your Stay
          </a>
          <a routerLink="/offers" class="border-2 border-white text-white hover:bg-white hover:text-gold-600 text-lg px-8 py-4 rounded-lg font-medium transition-all duration-200">
            View Special Offers
          </a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {}