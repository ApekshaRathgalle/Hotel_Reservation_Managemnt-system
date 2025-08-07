import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';

// This is a special endpoint to create the first admin - should be removed after use
export const createFirstAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if any admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      res.status(400).json({ 
        success: false,
        message: 'Admin user already exists. This endpoint is disabled.' 
      });
      return;
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email: 'apeksha@hotel.com' });
    if (existingUser) {
      res.status(400).json({ 
        success: false,
        message: 'User with this email already exists' 
      });
      return;
    }

    // Create the first admin user
    const adminUser = new User({
      email: 'apeksha@hotel.com',
      password: 'apeksha2003',
      firstName: 'Apeksha',
      lastName: 'Admin',
      role: 'admin',
      phone: '+1234567890'
    });

    await adminUser.save();

    const token = generateToken({ 
      id: (adminUser._id as string).toString(), 
      email: adminUser.email, 
      role: adminUser.role 
    });

    res.status(201).json({
      success: true,
      message: 'First admin user created successfully',
      token,
      user: {
        id: (adminUser._id as string).toString(),
        email: adminUser.email,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        phone: adminUser.phone,
        role: adminUser.role
      }
    });
  } catch (error: any) {
    console.error('Error creating first admin:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error while creating admin' 
    });
  }
};
