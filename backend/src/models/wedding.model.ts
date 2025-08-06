import { Schema, model } from 'mongoose';
import { IWeddingHall } from '../types';

const weddingHallSchema = new Schema<IWeddingHall>({
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
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  pricePerEvent: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true
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

export const WeddingHall = model<IWeddingHall>('WeddingHall', weddingHallSchema);