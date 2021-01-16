const User = (sequelize, Sequelize) => {
  const model = sequelize.define('user', {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return model;
};

export default User;
