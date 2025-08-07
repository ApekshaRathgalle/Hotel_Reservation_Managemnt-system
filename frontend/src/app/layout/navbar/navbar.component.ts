import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="flex items-center">
              <span class="text-2xl font-bold text-primary-600">LuxStay</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a routerLink="/hotels" routerLinkActive="nav-link-active" class="nav-link">Hotels</a>
              <a routerLink="/resorts" routerLinkActive="nav-link-active" class="nav-link">Resorts</a>
              <a routerLink="/weddings" routerLinkActive="nav-link-active" class="nav-link">Wedding Halls</a>
              <a routerLink="/events" routerLinkActive="nav-link-active" class="nav-link">Events</a>
              <a routerLink="/offers" routerLinkActive="nav-link-active" class="nav-link">Offers</a>
              <a routerLink="/booking" class="btn-gold">Book Now</a>
            </div>
          </div>

          <!-- User Menu -->
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <div *ngIf="!isAuthenticated" class="flex space-x-2">
                <a routerLink="/auth/login" class="btn-secondary">Login</a>
                <a routerLink="/auth/register" class="btn-primary">Register</a>
              </div>
              
              <div *ngIf="isAuthenticated" class="relative" #userMenu>
                <button 
                  (click)="toggleUserMenu()"
                  class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <span>{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </button>

                <div 
                  *ngIf="showUserMenu" 
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <a routerLink="/user-dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
                  <a *ngIf="isAdmin" routerLink="/admin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</a>
                  <button 
                    (click)="logout()" 
                    class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              (click)="toggleMobileMenu()"
              class="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div *ngIf="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <a routerLink="/hotels" class="nav-link block">Hotels</a>
          <a routerLink="/resorts" class="nav-link block">Resorts</a>
          <a routerLink="/weddings" class="nav-link block">Wedding Halls</a>
          <a routerLink="/events" class="nav-link block">Events</a>
          <a routerLink="/offers" class="nav-link block">Offers</a>
          <a routerLink="/booking" class="nav-link block text-gold-600 font-semibold">Book Now</a>
          
          <div *ngIf="!isAuthenticated" class="pt-2 space-y-2">
            <a routerLink="/auth/login" class="block text-center py-2 px-4 bg-gray-200 text-gray-900 rounded-lg">Login</a>
            <a routerLink="/auth/register" class="block text-center py-2 px-4 bg-primary-600 text-white rounded-lg">Register</a>
          </div>
          
          <div *ngIf="isAuthenticated" class="pt-2 space-y-2">
            <div class="px-2 text-sm font-medium text-gray-900">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</div>
            <a routerLink="/user-dashboard" class="nav-link block">Dashboard</a>
            <a *ngIf="isAdmin" routerLink="/admin" class="nav-link block">Admin Panel</a>
            <button 
              (click)="logout()" 
              class="w-full text-left nav-link block text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isAuthenticated = false;
  isAdmin = false;
  showUserMenu = false;
  showMobileMenu = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      this.isAdmin = this.authService.isAdmin();
    });
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu = false;
    this.showMobileMenu = false;
  }
}