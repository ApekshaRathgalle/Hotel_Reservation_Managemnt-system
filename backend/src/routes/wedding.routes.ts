import { Router } from 'express';
import { 
  getWeddingHalls, 
  getWeddingHall, 
  createWeddingHall, 
  updateWeddingHall, 
  deleteWeddingHall 
} from '../controllers/wedding.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getWeddingHalls);
router.get('/:id', getWeddingHall);
router.post('/', authenticate, requireAdmin, createWeddingHall);
router.put('/:id', authenticate, requireAdmin, updateWeddingHall);
router.delete('/:id', authenticate, requireAdmin, deleteWeddingHall);

export default router;