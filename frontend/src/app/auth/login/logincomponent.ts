import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex relative overflow-hidden">
      <!-- Background with animated gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 animate-gradient-xy"></div>
      
      <!-- Floating particles animation -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-particle absolute w-2 h-2 bg-white opacity-30 rounded-full" style="top: 20%; left: 10%; animation-delay: 0s;"></div>
        <div class="floating-particle absolute w-1 h-1 bg-blue-300 opacity-40 rounded-full" style="top: 60%; left: 80%; animation-delay: 2s;"></div>
        <div class="floating-particle absolute w-3 h-3 bg-purple-300 opacity-20 rounded-full" style="top: 30%; left: 70%; animation-delay: 4s;"></div>
        <div class="floating-particle absolute w-2 h-2 bg-white opacity-25 rounded-full" style="top: 80%; left: 20%; animation-delay: 1s;"></div>
        <div class="floating-particle absolute w-1 h-1 bg-blue-200 opacity-50 rounded-full" style="top: 40%; left: 90%; animation-delay: 3s;"></div>
      </div>

      <!-- Left side - Image section -->
      <div class="hidden lg:flex lg:w-1/2 relative">
        <div class="absolute inset-0 bg-black opacity-40 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" 
          alt="Luxury Hotel Lobby" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div class="text-center animate-fade-in-up">
            <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-8 mx-auto backdrop-blur-sm animate-bounce-slow">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
            <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Welcome to LuxStay
            </h1>
            <p class="text-xl text-blue-100 mb-6 leading-relaxed">
              Experience luxury hospitality at its finest. Your perfect stay awaits.
            </p>
            <div class="flex items-center justify-center space-x-4 text-sm text-blue-200">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Premium Service
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side - Login form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-30">
        <div class="max-w-md w-full">
          <!-- Logo for mobile -->
          <div class="lg:hidden text-center mb-8 animate-fade-in">
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-white">LuxStay</h1>
          </div>

          <div class="glass-card p-8 animate-slide-in-right">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2 animate-fade-in">Welcome Back</h2>
              <p class="text-gray-600 animate-fade-in-delay">Sign in to access your account</p>
            </div>
            
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div *ngIf="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-shake">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  {{ error }}
                </div>
              </div>

              <div class="space-y-4">
                <div class="animated-input-group">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      formControlName="email"
                      class="animated-input pl-10"
                      placeholder="Enter your email"
                      [class.border-red-300]="loginForm.get('email')?.touched && loginForm.get('email')?.errors"
                    >
                  </div>
                  <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.errors" class="text-red-600 text-sm mt-1 animate-fade-in">
                    <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
                    <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                  </div>
                </div>

                <div class="animated-input-group">
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      formControlName="password"
                      class="animated-input pl-10"
                      placeholder="Enter your password"
                      [class.border-red-300]="loginForm.get('password')?.touched && loginForm.get('password')?.errors"
                    >
                  </div>
                  <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors" class="text-red-600 text-sm mt-1 animate-fade-in">
                    <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
                    <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div class="text-sm">
                  <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">Forgot password?</a>
                </div>
              </div>

              <button
                type="submit"
                [disabled]="loginForm.invalid || loading"
                class="w-full animated-button group relative overflow-hidden"
              >
                <span class="relative z-10 flex items-center justify-center">
                  <span *ngIf="!loading">Sign In</span>
                  <span *ngIf="loading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              <div class="text-center">
                <p class="text-sm text-gray-600">
                  Don't have an account? 
                  <a routerLink="/auth/register" class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline">Sign up now</a>
                </p>
              </div>
            </form>

            <!-- Social login options -->
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <button class="social-button group">
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span class="ml-2">Google</span>
                </button>
                <button class="social-button group">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span class="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes gradient-xy {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    @keyframes floating {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    @keyframes bounceCustom {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .animate-gradient-xy {
      background-size: 400% 400%;
      animation: gradient-xy 15s ease infinite;
    }

    .floating-particle {
      animation: floating 6s ease-in-out infinite;
    }

    .animate-fade-in-up {
      animation: fadeInUp 1s ease-out;
    }

    .animate-slide-in-right {
      animation: slideInRight 0.8s ease-out;
    }

    .animate-fade-in {
      animation: fadeInUp 0.6s ease-out;
    }

    .animate-fade-in-delay {
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }

    .animate-shake {
      animation: shake 0.6s ease-in-out;
    }

    .animate-bounce-slow {
      animation: bounceCustom 3s ease-in-out infinite;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .animated-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      transition: all 0.3s ease;
      background: #f9fafb;
    }

    .animated-input:focus {
      outline: none;
      border-color: #3b82f6;
      background: white;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      transform: translateY(-2px);
    }

    .animated-input-group {
      position: relative;
    }

    .animated-input-group:hover .animated-input {
      border-color: #9ca3af;
    }

    .animated-button {
      width: 100%;
      padding: 0.875rem 1.5rem;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      font-weight: 600;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .animated-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
    }

    .animated-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .social-button {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-weight: 500;
      color: #374151;
    }

    .social-button:hover {
      border-color: #9ca3af;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          const user = this.authService.getCurrentUser();
          if (user?.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}