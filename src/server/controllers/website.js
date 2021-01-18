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

  const domain = req.body.url.match(
    /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/gi
  )[0];

  const website = { url: req.body.url, domain };

  try {
    const data = await Website.create(website);
    res.status(201).send({ message: 'You have successfully added a new website.', data });
  } catch (error) {
    res.status(500).send({
      message: error.errors
    });
  }
};

const list = async (req, res) => {
  try {
    const data = await Website.findAll({
      attributes: [
        'domain',
        [db.sequelize.fn('count', db.sequelize.col('domain')), 'cnt']
      ],
      group: ['domain']
    });

    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send({
      message: error.errors
    });
  }
};

export default {
  create,
  list
};
