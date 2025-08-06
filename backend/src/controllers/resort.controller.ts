import { Request, Response } from 'express';
import { Resort } from '../models/resort.model';

export const getResorts = async (req: Request, res: Response) => {
  try {
    const resorts = await Resort.find().sort({ createdAt: -1 });
    res.json({ success: true, data: resorts });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getResort = async (req: Request, res: Response) => {
  try {
    const resort = await Resort.findById(req.params.id);
    if (!resort) {
      return res.status(404).json({ message: 'Resort not found' });
    }
    res.json({ success: true, data: resort });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createResort = async (req: Request, res: Response) => {
  try {
    const resort = new Resort(req.body);
    await resort.save();
    res.status(201).json({ success: true, data: resort });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResort = async (req: Request, res: Response) => {
  try {
    const resort = await Resort.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!resort) {
      return res.status(404).json({ message: 'Resort not found' });
    }
    res.json({ success: true, data: resort });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResort = async (req: Request, res: Response) => {
  try {
    const resort = await Resort.findByIdAndDelete(req.params.id);
    if (!resort) {
      return res.status(404).json({ message: 'Resort not found' });
    }
    res.json({ success: true, message: 'Resort deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};