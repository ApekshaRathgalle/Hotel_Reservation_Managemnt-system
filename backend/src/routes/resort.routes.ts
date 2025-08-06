import { Router } from 'express';
import { 
  getResorts, 
  getResort, 
  createResort, 
  updateResort, 
  deleteResort 
} from '../controllers/resort.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getResorts);
router.get('/:id', getResort);
router.post('/', authenticate, requireAdmin, createResort);
router.put('/:id', authenticate, requireAdmin, updateResort);
router.delete('/:id', authenticate, requireAdmin, deleteResort);

export default router;