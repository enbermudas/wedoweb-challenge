const Website = (sequelize, Sequelize) => {
  const model = sequelize.define('websites', {
    url: {
      type: Sequelize.STRING
    }
  });

  return model;
};

export default Website;
