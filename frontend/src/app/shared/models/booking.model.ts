export interface Booking {
  _id: string;
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

export interface CreateBookingRequest {
  propertyType: 'hotel' | 'resort' | 'wedding' | 'event';
  propertyId: string;
  checkIn: Date;
  checkOut?: Date;
  guests: number;
  totalPrice: number;
  specialRequests?: string;
}