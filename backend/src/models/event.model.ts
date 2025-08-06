import { Schema, model } from 'mongoose';
import { IEvent } from '../types';

const eventSchema = new Schema<IEvent>({
  title: {
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
  date: {
    type: Date,
    required: true
  },
  images: [{
    type: String
  }],
  ticketPrice: {
    type: Number,
    required: true,
    min: 0
  },
  availableTickets: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Event = model<IEvent>('Event', eventSchema);