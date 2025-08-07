import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center mb-4">
              <span class="text-2xl font-bold text-gold-400">LuxStay</span>
            </div>
            <p class="text-gray-300 mb-4">
              Experience luxury and comfort at our premium hotels, resorts, and wedding venues. 
              Your perfect stay awaits with world-class amenities and exceptional service.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-gold-400 transition-colors duration-200">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gold-400 transition-colors duration-200">
                <span class="sr-only">Instagram</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gold-400 transition-colors duration-200">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a routerLink="/hotels" class="text-gray-300 hover:text-gold-400 transition-colors duration-200">Hotels</a></li>
              <li><a routerLink="/resorts" class="text-gray-300 hover:text-gold-400 transition-colors duration-200">Resorts</a></li>
              <li><a routerLink="/weddings" class="text-gray-300 hover:text-gold-400 transition-colors duration-200">Wedding Halls</a></li>
              <li><a routerLink="/events" class="text-gray-300 hover:text-gold-400 transition-colors duration-200">Events</a></li>
              <li><a routerLink="/offers" class="text-gray-300 hover:text-gold-400 transition-colors duration-200">Special Offers</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2 text-gray-300">
              <li>📧 info@luxstay.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Luxury Ave, Suite 100</li>
              <li class="ml-4">New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-8">
          <div class="text-center text-gray-400">
            <p>&copy; {{ currentYear }} LuxStay Hotel Chain. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}