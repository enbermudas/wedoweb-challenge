import db from '../config/sequelize';
import validators from '../validators';

const Website = db.websites;

const create = async (req, res) => {
  const errors = validators.createWebsite(req.body);
  if (errors.length !== 0) {
    return res.status(400).send({
      message: 'Validation failed.',
      errors
    });
  }

  const website = { url: req.body.url };

  try {
    const data = await Website.create(website);
    res.status(201).send({ message: 'You have successfully added a new website.', data });
  } catch (error) {
    res.status(500).send({
      message: error.errors
    });
  }
};

export default {
  create
};
