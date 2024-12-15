import { Router } from 'express';
import studentRoutes from './studentRoutes.js';

const router = Router();

router.use('/students', studentRoutes);
router.use('/health', (req, res) => {
    res.status(200).send('success')
})

export default router;