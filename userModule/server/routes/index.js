import { Router } from 'express';
import studentRoutes from './studentRoutes.js';

const router = Router();

router.use('/students', studentRoutes);

export default router;