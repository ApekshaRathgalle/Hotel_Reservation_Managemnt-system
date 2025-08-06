import { Router } from 'express';
import { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  getProfile,
  updateProfile
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/', authenticate, requireAdmin, getUsers);
router.get('/:id', authenticate, requireAdmin, getUser);
router.put('/:id', authenticate, requireAdmin, updateUser);
router.delete('/:id', authenticate, requireAdmin, deleteUser);

export default router;