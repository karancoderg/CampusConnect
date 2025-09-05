import { Router } from 'express';
const router = Router();

// Group routes by features as you implement:
router.use('/auth', Router());
router.use('/posts', Router());
router.use('/events', Router());
router.use('/advice', Router());
router.use('/notes', Router());
router.use('/time-capsule', Router());

export default router;
