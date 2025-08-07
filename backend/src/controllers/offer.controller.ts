import { Request, Response } from 'express';
import { Offer } from '../models/offer.model';

export const getOffers = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const offers = await Offer.find({
      validFrom: { $lte: currentDate },
      validTo: { $gte: currentDate }
    })
      .select('-__v') // Exclude version field
      .sort({ createdAt: -1 })
      .lean(); // Return plain JavaScript objects for better performance
    res.json({ success: true, data: offers });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find()
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: offers });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOffer = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id).select('-__v').lean();
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ success: true, data: offer });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createOffer = async (req: Request, res: Response) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json({ success: true, data: offer });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOffer = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ success: true, data: offer });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ success: true, message: 'Offer deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};