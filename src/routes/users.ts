import { Router } from 'express';
import { body } from 'express-validator';

import {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post(
  '/',
  [body('username').trim().not().isEmpty().isLength({ max: 20 })],
  addUser
);
router.patch(
  '/:id',
  [body('username').trim().not().isEmpty().isLength({ max: 20 })],
  updateUser
);
router.delete('/:id', deleteUser);

export { router as userRoutes };
