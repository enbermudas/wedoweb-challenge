import express from 'express';

const router = express.Router();

router.use('/', (req, res) => {
  res.status(200).json({ message: 'Server is online.' });
});

export default router;
