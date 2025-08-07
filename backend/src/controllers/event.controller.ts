import { Request, Response } from 'express';
import { Event } from '../models/event.model';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
      .select('-__v') // Exclude version field
      .sort({ date: 1 })
      .lean(); // Return plain JavaScript objects for better performance
    res.json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id).select('-__v').lean();
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ success: true, data: event });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ success: true, data: event });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ success: true, data: event });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};