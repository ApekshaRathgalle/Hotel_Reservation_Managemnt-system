import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import hotelRoutes from './routes/hotel.routes';
import resortRoutes from './routes/resort.routes';
import weddingRoutes from './routes/wedding.routes';
import eventRoutes from './routes/event.routes';
import offerRoutes from './routes/offer.routes';
import bookingRoutes from './routes/booking.routes';

import { errorHandler, notFound } from './middlewares/error.middleware';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env['FRONTEND_URL'] || 'http://localhost:4200',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/resorts', resortRoutes);
app.use('/api/weddings', weddingRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hotel Chain API is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;