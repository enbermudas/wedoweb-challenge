import signale from 'signale';
import server from './config/express';
import db from './config/sequelize';

// Database
db.sequelize.sync();

const port = process.env.PORT || 8080;

server.listen(port, () => {
  signale.info(`🚀 Server is running on http://localhost:${port}/api/v1`);
});
