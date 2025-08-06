import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phone }: RegisterRequest = req.body;

    // Input validation
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ 
        success: false,
        message: 'Email, password, firstName, and lastName are required' 
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long' 
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
      return;
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: 'user'
    });

    await user.save();

    const token = generateToken({ 
      id: (user._id as string).toString(), 
      email: user.email, 
      role: user.role 
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: (user._id as string).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
      return;
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({ 
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
      return;
    }

    res.status(500).json({ 
      success: false,
      message: 'Internal server error during registration' 
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Input validation
    if (!email || !password) {
      res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
      return;
    }

    const token = generateToken({ 
      id: (user._id as string).toString(), 
      email: user.email, 
      role: user.role 
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: (user._id as string).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error during login' 
    });
  }
};