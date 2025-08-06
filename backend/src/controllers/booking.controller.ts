import { Request, Response } from 'express';
import { Booking } from '../models/booking.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const bookingData = {
      ...req.body,
      userId: req.user?.id
    };

    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};