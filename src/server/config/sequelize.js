import { Sequelize } from 'sequelize';
import { HOST, USER, PASSWORD, DB, dialect, pool } from '../../../db.config';

// Models
import User from '../models/user';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect,
  operatorsAliases: false,
  pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = User(sequelize, Sequelize);

export default db;
