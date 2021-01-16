const User = (sequelize, Sequelize) => {
  const model = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  });

  model.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  return model;
};

export default User;
