import { Schema, model } from 'mongoose';
import { IHotel } from '../types';

const hotelSchema = new Schema<IHotel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  availableRooms: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
hotelSchema.index({ createdAt: -1 });
hotelSchema.index({ location: 1 });
hotelSchema.index({ pricePerNight: 1 });
hotelSchema.index({ rating: -1 });

export const Hotel = model<IHotel>('Hotel', hotelSchema);