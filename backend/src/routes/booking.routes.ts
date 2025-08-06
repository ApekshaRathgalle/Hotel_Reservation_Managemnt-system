import { Router } from 'express';
import { 
  createBooking, 
  getUserBookings, 
  getAllBookings,
  getBooking, 
  updateBooking, 
  cancelBooking 
} from '../controllers/booking.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin, requireUser } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticate, requireUser, createBooking);
router.get('/my', authenticate, requireUser, getUserBookings);
router.get('/all', authenticate, requireAdmin, getAllBookings);
router.get('/:id', authenticate, getBooking);
router.put('/:id', authenticate, requireAdmin, updateBooking);
router.patch('/:id/cancel', authenticate, requireUser, cancelBooking);

export default router;