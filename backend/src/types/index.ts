import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHotel extends Document {
  name: string;
  description: string;
  location: string;
  amenities: string[];
  images: string[];
  pricePerNight: number;
  availableRooms: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResort extends Document {
  name: string;
  description: string;
  location: string;
  amenities: string[];
  images: string[];
  pricePerNight: number;
  availableRooms: number;
  rating: number;
  activities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWeddingHall extends Document {
  name: string;
  description: string;
  location: string;
  capacity: number;
  amenities: string[];
  images: string[];
  pricePerEvent: number;
  available: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent extends Document {
  title: string;
  description: string;
  location: string;
  date: Date;
  images: string[];
  ticketPrice: number;
  availableTickets: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOffer extends Document {
  title: string;
  description: string;
  discountPercentage: number;
  validFrom: Date;
  validTo: Date;
  applicableType: 'hotel' | 'resort' | 'wedding' | 'event';
  applicableIds: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking extends Document {
  userId: string;
  propertyType: 'hotel' | 'resort' | 'wedding' | 'event';
  propertyId: string;
  checkIn: Date;
  checkOut?: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}