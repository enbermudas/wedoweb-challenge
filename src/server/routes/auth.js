import express from 'express';
import AuthController from '../controllers/auth';

const router = express.Router();

router.post('/signup', (req, res) => {
  return AuthController.signup(req, res);
});

export default router;
