import { Schema, model } from 'mongoose';
import { IBooking } from '../types';

const bookingSchema = new Schema<IBooking>({
  userId: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    enum: ['hotel', 'resort', 'wedding', 'event'],
    required: true
  },
  propertyId: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  specialRequests: {
    type: String
  }
}, {
  timestamps: true
});

export const Booking = model<IBooking>('Booking', bookingSchema);