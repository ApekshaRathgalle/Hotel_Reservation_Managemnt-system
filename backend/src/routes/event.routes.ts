import { Router } from 'express';
import { 
  getEvents, 
  getEvent, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/event.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', authenticate, requireAdmin, createEvent);
router.put('/:id', authenticate, requireAdmin, updateEvent);
router.delete('/:id', authenticate, requireAdmin, deleteEvent);

export default router;