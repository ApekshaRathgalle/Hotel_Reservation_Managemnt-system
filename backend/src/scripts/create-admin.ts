import mongoose from 'mongoose';
import { User } from '../models/user.model';
import connectDB from '../config/database';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createFirstAdmin = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      process.exit(0);
    }
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email: 'apeksha@hotel.com' });
    if (existingUser) {
      // Update existing user to admin
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('Existing user promoted to admin:', existingUser.email);
    } else {
      // Create new admin user
      const adminUser = new User({
        email: 'apeksha@hotel.com',
        password: 'apeksha2003',
        firstName: 'Apeksha',
        lastName: 'Admin',
        role: 'admin',
        phone: '+1234567890'
      });
      
      await adminUser.save();
      console.log('First admin user created successfully!');
      console.log('Email: apeksha@hotel.com');
      console.log('Password: apeksha2003');
      console.log('Name: Apeksha Admin');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the script
createFirstAdmin();
