import { Router } from 'express';
import { 
  getOffers, 
  getAllOffers,
  getOffer, 
  createOffer, 
  updateOffer, 
  deleteOffer 
} from '../controllers/offer.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getOffers);
router.get('/all', authenticate, requireAdmin, getAllOffers);
router.get('/:id', getOffer);
router.post('/', authenticate, requireAdmin, createOffer);
router.put('/:id', authenticate, requireAdmin, updateOffer);
router.delete('/:id', authenticate, requireAdmin, deleteOffer);

export default router;