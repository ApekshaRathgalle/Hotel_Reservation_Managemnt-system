import { Request, Response } from 'express';
import { Hotel } from '../models/hotel.model';

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: hotels });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ success: true, data: hotel });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createHotel = async (req: Request, res: Response) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ success: true, data: hotel });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ success: true, data: hotel });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ success: true, message: 'Hotel deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};