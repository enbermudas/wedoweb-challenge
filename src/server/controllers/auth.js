import bcrypt from 'bcryptjs';
import db from '../config/sequelize';
import validators from '../validators';

const User = db.users;
const Op = db.Sequelize.Op;

const signup = async (req, res) => {
  const errors = validators.signup(req.body);
  if (errors.length !== 0) {
    return res.status(400).send({
      message: 'Validation failed.',
      errors
    });
  }

  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = { username, email, password: hash };

  try {
    const data = await User.create(user);
    res.status(201).send({ message: 'You have successfully signed up.', data });
  } catch (error) {
    res.status(500).send({
      message: error.errors
    });
  }
};

const signin = (req, res) => {};

export default {
  signup,
  signin
};
