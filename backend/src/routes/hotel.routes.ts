import { Router } from 'express';
import { 
  getHotels, 
  getHotel, 
  createHotel, 
  updateHotel, 
  deleteHotel 
} from '../controllers/hotel.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getHotels);
router.get('/:id', getHotel);
router.post('/', authenticate, requireAdmin, createHotel);
router.put('/:id', authenticate, requireAdmin, updateHotel);
router.delete('/:id', authenticate, requireAdmin, deleteHotel);

export default router;