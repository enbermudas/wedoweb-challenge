import express from 'express';
import WebsiteController from '../controllers/website';

const router = express.Router();

router.post('/create', (req, res) => {
  return WebsiteController.create(req, res);
});

export default router;
