import express from 'express';
import AuthController from '../controllers/auth';

const router = express.Router();

router.post('/signup', (req, res) => {
  return AuthController.signup(req, res);
});

router.post('/signin', (req, res) => {
  return AuthController.signin(req, res);
});

export default router;
