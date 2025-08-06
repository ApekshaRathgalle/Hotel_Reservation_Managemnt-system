import { Schema, model } from 'mongoose';
import { IOffer } from '../types';

const offerSchema = new Schema<IOffer>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  validFrom: {
    type: Date,
    required: true
  },
  validTo: {
    type: Date,
    required: true
  },
  applicableType: {
    type: String,
    enum: ['hotel', 'resort', 'wedding', 'event'],
    required: true
  },
  applicableIds: [{
    type: String
  }],
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Offer = model<IOffer>('Offer', offerSchema);