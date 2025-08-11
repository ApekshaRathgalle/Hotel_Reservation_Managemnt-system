# Hotel Reservation Management System

A comprehensive, full-stack hotel reservation and property management system built with modern web technologies. This enterprise-grade solution streamlines hotel operations, from guest bookings to administrative management, providing a seamless experience for both customers and hotel staff.

## 🏨 Project Overview

LuxStay Hotel Management System is a sophisticated full-stack application designed to revolutionize hotel and resort management operations. The platform serves multiple stakeholders:

### For Customers:
- **Intuitive Booking Experience**: Browse and book hotels, resorts, and event venues with ease
- **Real-time Availability**: Check room availability and pricing in real-time
- **Personalized Dashboard**: Manage bookings, view history, and track reservations
- **Multi-property Support**: Book across different property types (hotels, resorts, wedding venues)
- **Special Events**: Book wedding venues and event spaces with customized packages
- **Exclusive Offers**: Access special deals and promotional packages

### For Hotel Administrators:
- **Comprehensive Property Management**: Manage multiple properties from a centralized dashboard
- **Booking Analytics**: Track occupancy rates, revenue, and booking trends
- **Guest Management**: Maintain guest profiles and booking history
- **Inventory Control**: Manage room availability, pricing, and special offers
- **Revenue Optimization**: Dynamic pricing and yield management tools
- **Staff Management**: Coordinate housekeeping, maintenance, and guest services

### For System Administrators:
- **User Management**: Control user access and permissions across the platform
- **System Analytics**: Monitor platform performance and usage statistics
- **Content Management**: Update property information, images, and descriptions
- **Security Oversight**: Monitor system security and user activities

## 🏗️ System Architecture

The application follows a modern microservices-inspired architecture with clear separation of concerns:

### Frontend Architecture (Angular)
- **Component-Based Design**: Modular, reusable components for scalability
- **Reactive Programming**: RxJS for handling asynchronous operations
- **State Management**: Centralized state management for complex data flows
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Progressive Web App**: Offline capabilities and mobile app-like experience

### Backend Architecture (Node.js)
- **RESTful API Design**: Clean, documented API endpoints
- **Middleware Pipeline**: Authentication, authorization, and error handling
- **Database Abstraction**: Mongoose ODM for MongoDB interactions
- **Security Layer**: JWT authentication, input validation, and rate limiting
- **Scalable Structure**: Modular controllers, services, and utilities

### Technology Stack
- **Frontend**: Angular 20+ with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express.js and TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based secure authentication
- **Deployment**: Docker containerization ready

## 📁 Detailed Project Structure

```
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── app.ts          # Express app configuration and middleware setup
│   │   ├── server.ts       # Server entry point and database connection
│   │   ├── config/         # Configuration files
│   │   │   └── database.ts # MongoDB connection and configuration
│   │   ├── controllers/    # Route controllers (business logic)
│   │   │   ├── admin.controller.ts    # Admin management operations
│   │   │   ├── auth.controller.ts     # Authentication logic
│   │   │   ├── booking.controller.ts  # Booking management
│   │   │   ├── event.controller.ts    # Event management
│   │   │   ├── hotel.controller.ts    # Hotel operations
│   │   │   ├── offer.controller.ts    # Special offers management
│   │   │   ├── resort.controller.ts   # Resort operations
│   │   │   ├── user.controller.ts     # User profile management
│   │   │   └── wedding.controller.ts  # Wedding venue management
│   │   ├── middlewares/    # Custom middlewares
│   │   │   ├── auth.middleware.ts     # JWT authentication
│   │   │   ├── error.middleware.ts    # Global error handling
│   │   │   └── role.middleware.ts     # Role-based access control
│   │   ├── models/         # MongoDB/Mongoose models
│   │   │   ├── booking.model.ts       # Booking schema
│   │   │   ├── event.model.ts         # Event schema
│   │   │   ├── hotel.model.ts         # Hotel schema
│   │   │   ├── offer.model.ts         # Offers schema
│   │   │   ├── resort.model.ts        # Resort schema
│   │   │   ├── user.model.ts          # User schema
│   │   │   └── wedding.model.ts       # Wedding venue schema
│   │   ├── routes/         # API route definitions
│   │   │   ├── auth.routes.ts         # Authentication endpoints
│   │   │   ├── booking.routes.ts      # Booking endpoints
│   │   │   ├── event.routes.ts        # Event endpoints
│   │   │   ├── hotel.routes.ts        # Hotel endpoints
│   │   │   ├── offer.routes.ts        # Offers endpoints
│   │   │   ├── resort.routes.ts       # Resort endpoints
│   │   │   ├── user.routes.ts         # User endpoints
│   │   │   └── wedding.routes.ts      # Wedding endpoints
│   │   ├── scripts/        # Utility scripts
│   │   │   └── create-admin.ts        # Admin user creation script
│   │   ├── types/          # TypeScript type definitions
│   │   │   └── index.ts               # Global type definitions
│   │   └── utils/          # Utility functions
│   │       └── jwt.ts                 # JWT utility functions
│   ├── package.json        # Backend dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration
├── frontend/               # Angular frontend application
│   ├── src/
│   │   ├── app/           # Angular app components and modules
│   │   │   ├── admin/     # Admin panel components
│   │   │   │   ├── bookings/          # Booking management
│   │   │   │   ├── dashboard/         # Admin dashboard
│   │   │   │   ├── properties/        # Property management
│   │   │   │   └── users/             # User management
│   │   │   ├── auth/      # Authentication components
│   │   │   │   ├── login/             # Login component
│   │   │   │   └── register/          # Registration component
│   │   │   ├── booking/   # Booking system components
│   │   │   │   └── booking-form/      # Booking form component
│   │   │   ├── core/      # Core application services
│   │   │   │   ├── guards/            # Route guards
│   │   │   │   └── services/          # Core services
│   │   │   ├── events/    # Event management components
│   │   │   │   ├── event-detail/      # Event details
│   │   │   │   └── event-list/        # Event listing
│   │   │   ├── hotels/    # Hotel components
│   │   │   │   ├── hotel-detail/      # Hotel details
│   │   │   │   └── hotel-list/        # Hotel listing
│   │   │   ├── layout/    # Layout components
│   │   │   │   ├── footer/            # Footer component
│   │   │   │   └── navbar/            # Navigation component
│   │   │   ├── offers/    # Special offers components
│   │   │   │   └── offer-list/        # Offers listing
│   │   │   ├── resorts/   # Resort components
│   │   │   │   ├── resort-detail/     # Resort details
│   │   │   │   └── resort-list/       # Resort listing
│   │   │   ├── shared/    # Shared components and services
│   │   │   │   ├── models/            # TypeScript interfaces
│   │   │   │   └── services/          # Shared services
│   │   │   ├── user-dashboard/        # User dashboard
│   │   │   └── weddings/  # Wedding venue components
│   │   ├── styles.css     # Global styles and Tailwind imports
│   │   ├── index.html     # Main HTML file
│   │   ├── main.ts        # Angular application bootstrap
│   │   └── server.ts      # Server-side rendering setup
│   ├── public/            # Static assets
│   │   ├── assets/        # Images and media files
│   │   │   ├── beach-resort.jpg
│   │   │   ├── hotel-lobby.jpg
│   │   │   ├── hotel-room.jpg
│   │   │   ├── resort-pool.jpeg
│   │   │   └── wedding-venue.jpg
│   │   └── favicon.ico    # Application favicon
│   ├── angular.json       # Angular CLI configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── package.json       # Frontend dependencies and scripts
│   └── tsconfig.json      # TypeScript configuration
└── README.md              # Project documentation
```

## 🎨 Key Features

### 🏨 Property Management
- **Multi-Property Support**: Manage hotels, resorts, and wedding venues
- **Room Inventory**: Track room types, availability, and pricing
- **Media Management**: Upload and manage property images
- **Amenities Tracking**: List and manage property amenities
- **Location Services**: Integration with mapping services

### 📅 Booking System
- **Real-Time Availability**: Live room availability checking
- **Flexible Date Selection**: Calendar-based date picker
- **Guest Information**: Collect and manage guest details
- **Payment Integration**: Ready for payment gateway integration
- **Booking Confirmation**: Automated confirmation emails
- **Modification & Cancellation**: Easy booking changes

### 👥 User Management
- **Role-Based Access**: Admin, Staff, and Customer roles
- **User Profiles**: Comprehensive user profile management
- **Authentication**: Secure JWT-based authentication
- **Password Security**: Encrypted password storage
- **Session Management**: Secure session handling

### 📊 Analytics & Reporting
- **Occupancy Reports**: Track room occupancy rates
- **Revenue Analytics**: Monitor booking revenue
- **Guest Analytics**: Analyze guest booking patterns
- **Performance Metrics**: Key performance indicators
- **Export Capabilities**: Export reports in various formats

### 🎉 Event Management
- **Wedding Venues**: Specialized wedding venue booking
- **Corporate Events**: Business event space management
- **Package Deals**: Custom event packages
- **Catering Services**: Food and beverage coordination
- **Vendor Management**: Third-party vendor coordination

### 💰 Pricing & Offers
- **Dynamic Pricing**: Seasonal and demand-based pricing
- **Special Offers**: Promotional packages and discounts
- **Loyalty Programs**: Guest loyalty point system
- **Group Bookings**: Special rates for group reservations
- **Early Bird Discounts**: Advance booking incentives

## 🔧 Development

