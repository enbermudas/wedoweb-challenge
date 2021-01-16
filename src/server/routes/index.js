import express from 'express';
import auth from './auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is online.' });
});

router.use('/auth', auth);

export default router;
