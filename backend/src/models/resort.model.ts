import { Schema, model } from 'mongoose';
import { IResort } from '../types';

const resortSchema = new Schema<IResort>({
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
  },
  activities: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Resort = model<IResort>('Resort', resortSchema);