import bcrypt from 'bcryptjs';
import db from '../config/sequelize';
import validators from '../validators';

const User = db.users;

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

const signin = async (req, res) => {
  const errors = validators.signin(req.body);
  if (errors.length !== 0) {
    return res.status(400).send({
      message: 'Validation failed.',
      errors
    });
  }

  try {
    const data = await User.findOne({ where: { email: req.body.email } });

    if (!data) {
      return res.status(400).send({ message: 'Email provided not found.' });
    }

    const isRightPassword = bcrypt.compareSync(req.body.password, data.password);

    if (!isRightPassword) {
      return res.status(400).send({ message: 'Wrong password provided.' });
    }

    res.status(200).send({ message: 'You have successfully logged in.', data });
  } catch (error) {
    res.status(500).send({
      message: error.errors
    });
  }
};

export default {
  signup,
  signin
};
