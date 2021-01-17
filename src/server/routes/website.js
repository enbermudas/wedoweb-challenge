import express from 'express';
import WebsiteController from '../controllers/website';

const router = express.Router();

router.get('/', (req, res) => {
  return WebsiteController.list(req, res);
});

router.post('/create', (req, res) => {
  return WebsiteController.create(req, res);
});

export default router;
