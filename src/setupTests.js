import '@testing-library/jest-dom';
import db from './server/config/sequelize';

const cleanDB = async (db) => {
  const tableNames = Object.keys(db.sequelize.models);

  for (let i = 0; i < tableNames.length; i++) {
    await db.sequelize.query(`TRUNCATE TABLE ${tableNames[i]};`);
  }
};

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await cleanDB(db);
  await db.sequelize.close();
});
