import { Request, Response } from 'express';
import { WeddingHall } from '../models/wedding.model';

export const getWeddingHalls = async (req: Request, res: Response) => {
  try {
    const halls = await WeddingHall.find()
      .select('-__v') // Exclude version field
      .sort({ createdAt: -1 })
      .lean(); // Return plain JavaScript objects for better performance
    res.json({ success: true, data: halls });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getWeddingHall = async (req: Request, res: Response) => {
  try {
    const hall = await WeddingHall.findById(req.params['id']).select('-__v').lean();
    if (!hall) {
      return res.status(404).json({ message: 'Wedding hall not found' });
    }
    res.json({ success: true, data: hall });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createWeddingHall = async (req: Request, res: Response) => {
  try {
    const hall = new WeddingHall(req.body);
    await hall.save();
    res.status(201).json({ success: true, data: hall });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWeddingHall = async (req: Request, res: Response) => {
  try {
    const hall = await WeddingHall.findByIdAndUpdate(req.params['id'], req.body, {
      new: true,
      runValidators: true
    });
    if (!hall) {
      return res.status(404).json({ message: 'Wedding hall not found' });
    }
    res.json({ success: true, data: hall });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWeddingHall = async (req: Request, res: Response) => {
  try {
    const hall = await WeddingHall.findByIdAndDelete(req.params['id']);
    if (!hall) {
      return res.status(404).json({ message: 'Wedding hall not found' });
    }
    res.json({ success: true, message: 'Wedding hall deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};