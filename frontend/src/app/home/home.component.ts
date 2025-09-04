import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<!-- Hero Section with Glassmorphism and Animated Elements -->
    <section 
      class="relative w-full h-screen flex items-center justify-center text-white overflow-hidden"
      style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%), url('https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'); background-size: cover; background-position: center; background-blend-mode: overlay;"
    >
      <!-- Floating particles animation -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white opacity-70 rounded-full animate-bounce" style="animation-delay: 0s; animation-duration: 3s;"></div>
        <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-gold-300 opacity-60 rounded-full animate-ping" style="animation-delay: 1s; animation-duration: 4s;"></div>
        <div class="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white opacity-40 rounded-full animate-pulse" style="animation-delay: 2s; animation-duration: 5s;"></div>
        <div class="absolute top-1/2 right-1/4 w-2 h-2 bg-gold-400 opacity-50 rounded-full animate-bounce" style="animation-delay: 0.5s; animation-duration: 3.5s;"></div>
      </div>
      
      <!-- Glassmorphism overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40 "></div>
      
      <!-- Main content without container box -->
      <div class="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
        <div class="mb-8">
          <h1 class="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent animate-pulse">
            LuxStay
          </h1>
          <div class="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-6 rounded-full"></div>
        </div>
        
        <p class="text-xl md:text-3xl mb-10 font-light leading-relaxed max-w-4xl mx-auto text-white/90">
          Discover extraordinary experiences at our premium hotels, resorts, and wedding venues across the world
        </p>
        
        <div class="flex justify-center">
          <a routerLink="/booking" class="group relative bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-bold text-lg px-10 py-5 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <span class="relative z-10">Book Now</span>
            <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
          </a>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Services Section with Neumorphism Cards -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-full h-full opacity-5">
        <div class="absolute top-10 left-10 w-72 h-72 bg-primary-600 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Our Services
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6 rounded-full"></div>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From luxury accommodations to unforgettable events, we offer everything you need for the perfect stay
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Hotels -->
          <div class="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">Luxury Hotels</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">Premium accommodations with world-class amenities and exceptional service</p>
              <a routerLink="/hotels" class="inline-flex items-center text-primary-600 hover:text-primary-800 font-bold group-hover:translate-x-2 transition-transform duration-300">
                Explore Hotels 
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Resorts -->
          <div class="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Beach Resorts</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">Tropical paradises with endless activities and breathtaking ocean views</p>
              <a routerLink="/resorts" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold group-hover:translate-x-2 transition-transform duration-300">
                Explore Resorts 
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Wedding Halls -->
          <div class="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">Wedding Venues</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">Elegant venues perfect for your special day with comprehensive wedding services</p>
              <a routerLink="/weddings" class="inline-flex items-center text-pink-600 hover:text-pink-800 font-bold group-hover:translate-x-2 transition-transform duration-300">
                Explore Venues 
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Events -->
          <div class="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">Special Events</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">Exclusive events, concerts, and entertainment experiences for our guests</p>
              <a routerLink="/events" class="inline-flex items-center text-purple-600 hover:text-purple-800 font-bold group-hover:translate-x-2 transition-transform duration-300">
                View Events 
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Section with Parallax Effect -->
    <section class="py-20 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="text-white">
            <h2 class="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-gold-300 bg-clip-text text-transparent">
              Experience Luxury Like Never Before
            </h2>
            <p class="text-xl text-gray-300 mb-8 leading-relaxed">
              Our commitment to excellence ensures that every guest enjoys unparalleled comfort, 
              exceptional service, and unforgettable memories. From intimate getaways to grand celebrations, 
              we make every moment extraordinary.
            </p>
            <div class="space-y-6">
              <div class="flex items-center group">
                <div class="w-4 h-4 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                <span class="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">24/7 Concierge Service</span>
              </div>
              <div class="flex items-center group">
                <div class="w-4 h-4 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                <span class="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">Award-Winning Restaurants</span>
              </div>
              <div class="flex items-center group">
                <div class="w-4 h-4 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                <span class="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">Spa & Wellness Centers</span>
              </div>
              <div class="flex items-center group">
                <div class="w-4 h-4 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                <span class="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">Exclusive Member Benefits</span>
              </div>
            </div>
          </div>
          
          <!-- Image Mosaic with Hover Effects -->
          <div class="relative">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-6">
                <div class="group relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" 
                    alt="Luxury hotel lobby" 
                    class="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="group relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg" 
                    alt="Resort pool" 
                    class="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div class="space-y-6 pt-12">
                <div class="group relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg" 
                    alt="Hotel room" 
                    class="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="group relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg" 
                    alt="Wedding setup" 
                    class="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  `
})
export class HomeComponent {}