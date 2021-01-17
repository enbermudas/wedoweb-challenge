import express from 'express';
import auth from './auth';
import website from './website';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is online.' });
});

router.use('/auth', auth);
router.use('/website', website);

export default router;
