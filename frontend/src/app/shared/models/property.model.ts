export interface Hotel {
  _id: string;
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

export interface Resort {
  _id: string;
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

export interface WeddingHall {
  _id: string;
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

export interface Event {
  _id: string;
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

export interface Offer {
  _id: string;
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

export type PropertyType = 'hotel' | 'resort' | 'wedding' | 'event';